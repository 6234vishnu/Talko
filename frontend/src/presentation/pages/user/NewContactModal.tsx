import React, { useState } from 'react';
import { X, User, Phone, QrCode, Save, Camera } from 'lucide-react';


interface AddNewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contactData: ContactData) => void;
}

interface ContactData {
  name: string;
  phoneNumber: string;
  avatar?: string;
}

const AddNewContactModal: React.FC<AddNewContactModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'qrcode'>('form');
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    phoneNumber: '',
  });
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(contactData);
    // Reset form
    setContactData({ name: '', phoneNumber: '' });
    onClose();
  };

  const startQrScanner = () => {
    setIsScanning(true);
    // Simulate QR code scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setContactData({
        name: 'John Doe',
        phoneNumber: '+1 (555) 123-4567',
      });
      setActiveTab('form');
    }, 2000);
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
  <div className="bg-[#1e1e1e] text-white p-6 rounded-lg w-[90%] max-w-md shadow-lg text-center">
    {/* Header */}
    <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-2">
      <h2 className="text-lg font-semibold">Add New Contact</h2>
      <button
        className="text-white hover:text-gray-300"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={20} />
      </button>
    </div>

    {/* Tabs */}
    <div className="flex justify-around mt-4 border-b border-[#2a2a2a]">
      <button
        className={`flex flex-col items-center py-2 transition-colors ${
          activeTab === 'form' ? 'border-b-2 border-white' : ''
        }`}
        onClick={() => setActiveTab('form')}
      >
        <User size={18} />
        <span className="text-sm">Manual Entry</span>
      </button>
      <button
        className={`flex flex-col items-center py-2 transition-colors ${
          activeTab === 'qrcode' ? 'border-b-2 border-white' : ''
        }`}
        onClick={() => setActiveTab('qrcode')}
      >
        <QrCode size={18} />
        <span className="text-sm">Scan QR Code</span>
      </button>
    </div>

    {/* Content */}
    <div className="mt-4">
      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="py-10">
            <button type="button" className="p-5 bg-[#292929] rounded-full">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-[#292929] p-3 rounded">
            <User size={16} />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter contact name"
              value={contactData.name}
              onChange={handleInputChange}
              required
              className="bg-transparent border-none outline-none text-white w-full"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#292929] p-3 rounded">
            <Phone size={16} />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={contactData.phoneNumber}
              onChange={handleInputChange}
              required
              className="bg-transparent border-none outline-none text-white w-full"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-[#292929] text-white py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4caf50] text-white py-2 px-4 rounded flex items-center gap-2"
            >
              <Save size={16} />
              <span>Save Contact</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center mt-6">
          {isScanning ? (
            <div className="animate-pulse">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-full"></div>
              <p>Scanning QR Code...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center gap-3">
                <QrCode size={64} />
                <p>Scan a QR code to add a new contact</p>
              </div>
              <button
                className="mt-4 bg-[#292929] text-white py-2 px-4 rounded flex items-center gap-2"
                onClick={startQrScanner}
              >
                <Camera size={20} />
                <span>Start Scanning</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default AddNewContactModal;