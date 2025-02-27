import React, { useState } from 'react';
import '../../../styles/admin/adminLogin.css';

// Define types for form data
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: string;
  securityQuestion: string;
  securityAnswer: string;
  twoFactorEnabled: boolean;
}

// Define types for validation errors
interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

const AdminLogin: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: '',
    securityQuestion: '',
    securityAnswer: '',
    twoFactorEnabled: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = 3;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';

    setFormData({
      ...formData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validate form data for each step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      }

      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
        isValid = false;
      }

      if (!formData.role) {
        newErrors.role = 'Role is required';
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.securityQuestion) {
        newErrors.securityQuestion = 'Security question is required';
        isValid = false;
      }

      if (!formData.securityAnswer) {
        newErrors.securityAnswer = 'Security answer is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next button
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

    // New function to trigger confetti effect
    const triggerConfetti = () => {
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        confettiContainer.style.display = 'block';
        const confettiPieces = confettiContainer.querySelectorAll('.confetti');
        const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f'];
        
        confettiPieces.forEach((piece) => {
          const x = Math.random() * 100; // Random horizontal position (0 to 100%)
          const y = Math.random() * 100; // Random vertical position (0 to 100%)
          const color = colors[Math.floor(Math.random() * colors.length)];
          (piece as HTMLElement).style.setProperty('--x', `${x}%`);
          (piece as HTMLElement).style.setProperty('--y', `${y}%`);
          (piece as HTMLElement).style.backgroundColor = color;
        });
  
        setTimeout(() => {
          confettiContainer.style.display = 'none';
        }, 3000); // Hide after 3 seconds
      }
    };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Submit the form data to your API
      console.log('Form submitted successfully:', formData);

      // Trigger the confetti effect
      triggerConfetti();


    }
  };

  // Render form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h2>Account Setup</h2>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Admin Details</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Admin Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'error' : ''}
              >
                <option value="">Select a role</option>
                <option value="super_admin">Super Admin</option>
                <option value="user_admin">User Admin</option>
              </select>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Security Setup</h2>
            <div className="form-group">
              <label htmlFor="securityQuestion">Security Question</label>
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className={errors.securityQuestion ? 'error' : ''}
              >
                <option value="">Select a security question</option>
                <option value="maiden_name">What is your mother's maiden name?</option>
                <option value="first_pet">What was the name of your first pet?</option>
                <option value="birth_city">In which city were you born?</option>
                <option value="school">What was the name of your first school?</option>
              </select>
              {errors.securityQuestion && <span className="error-message">{errors.securityQuestion}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="securityAnswer">Security Answer</label>
              <input
                type="text"
                id="securityAnswer"
                name="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
                className={errors.securityAnswer ? 'error' : ''}
              />
              {errors.securityAnswer && <span className="error-message">{errors.securityAnswer}</span>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
    
    <img style={{width:"90px",height:"90px",marginLeft:"150px",borderRadius:"50px"}} src="\src\assets\images\file-MNLWh3Knn3VmdNXgBsDF41.webp" alt="Talko" />
      
      {/* Add this container for the confetti effect */}
      <div id="confetti-container">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="confetti"></div>
        ))}
      </div>

   

      <div className="form-header">
        <h1>Admin Registration</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
          <div className="step-indicators">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`step-indicator ${currentStep > index + 1 ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;