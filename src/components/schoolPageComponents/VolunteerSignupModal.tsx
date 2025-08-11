import React, { useState } from "react";
import Modal from 'react-modal'
import { School } from "@/types/school"

const WHY_INTERESTED_OPTIONS = {
    LIVE_NEARBY: "I live nearby, and would like to help if I can be helpful",
    ALUMNI: "I am an alumni of the school",
    PARENT_GUARDIAN: "I am the parent/ guardian of a current student",
    SPECIFIC_INTEREST: "There is something specific about {schoolName} that I'm interested in"
} as const;

const VOLUNTEER_OPPORTUNITY_OPTIONS = {
    TUTORING: "Tutoring/ classroom support",
    EVENT: "Event volunteering",
    GARDENING: "Gardening", 
    OTHER_SKILLS: "Other skill that I'd like to contribute (music, athletics, yoga, mindfulness, etc.)",
    BEHIND_SCENES: "Behind-the-scenes support for the school (website, fundraising, translation, etc.)",
    FLEXIBLE: "Flexible depending on what the school needs!"
} as const;

interface VolunteerFormData {
    schoolId: string;
    schoolName: string;
    currentPage: 1 | 2 | 3;
    whyInterested: keyof typeof WHY_INTERESTED_OPTIONS;
    opportunities: keyof typeof VOLUNTEER_OPPORTUNITY_OPTIONS;
    name: string;
    email: string;
}

interface VolunteerSignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    school: School;
    onSubmit: (data: VolunteerFormData) => void;
}

const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "100",
    },
};
  
const VolunteerSignupModal: React.FC<VolunteerSignupModalProps> = ({
    isOpen,
    onClose,
    school,
    onSubmit
}) => {
    Modal.setAppElement("body");

    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState<Partial<VolunteerFormData>>({
        schoolId: school.stub || '',
        schoolName: school.name,
        whyInterested: '' as keyof typeof WHY_INTERESTED_OPTIONS,
        opportunities: '' as keyof typeof VOLUNTEER_OPPORTUNITY_OPTIONS,
        name: '',
        email: '',
    });

    const getDisplayText = (option: keyof typeof WHY_INTERESTED_OPTIONS, schoolName: string) => {
        if (option === 'SPECIFIC_INTEREST') {
            return WHY_INTERESTED_OPTIONS.SPECIFIC_INTEREST.replace('{schoolName}', schoolName);
        }
        return WHY_INTERESTED_OPTIONS[option];
    };

    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = () => {
        if (formData.whyInterested && formData.opportunities && formData.name && formData.email) {
            onSubmit(formData as VolunteerFormData);
        }
    };

    const updateFormData = (field: keyof VolunteerFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Why Interested?
    const renderPage1 = () => (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-medium text-blue-900">
                Thank you for signing up to volunteer with {school.name}!
            </h1>

            <div className="flex flex-col gap-4">
                <h2 className="text-lg text-blue-900">
                    Why are you interested in volunteering at {school.name}?
                </h2>

                <div className="flex flex-col gap-3">
                    {Object.entries(WHY_INTERESTED_OPTIONS).map(([key, text]) => (
                        <label key={key} className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="radio"
                                name="whyInterested"
                                value={key}
                                checked={formData.whyInterested === key}
                                onChange={(e) => updateFormData('whyInterested', e.target.value)}
                                className="text-blue-500"
                            />
                            <span className="text-blue-900">
                                {getDisplayText(key as keyof typeof WHY_INTERESTED_OPTIONS, school.name)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )

    // Volunteer Opportunities
    const renderPage2 = () => (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium text-blue-900">
            Thank you for signing up to volunteer with {school.name}!
          </h1>
          
          <div className="flex flex-col gap-4">
            <h2 className="text-lg text-blue-900">
              What kinds of volunteer opportunities are you interested in?
            </h2>
            
            <div className="flex flex-col gap-3">
              {Object.entries(VOLUNTEER_OPPORTUNITY_OPTIONS).map(([key, text]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="opportunities"
                    value={key}
                    checked={formData.opportunities === key}
                    onChange={(e) => updateFormData('opportunities', e.target.value)}
                    className="text-blue-500"
                  />
                  <span className="text-blue-900">{text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
    );

    // Contact information
    const renderPage3 = () => (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-medium text-blue-900">
            Thank you for signing up to volunteer with {school.name}!
          </h1>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-blue-900">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blue-900">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
    );

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 1:
                return renderPage1();
            case 2:
                return renderPage2();
            case 3:
                return renderPage3();
            default:
                return renderPage1();
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            className="absolute left-1/2 top-1/2 w-4/6 -translate-x-1/2 -translate-y-1/2 transform rounder-md bg-white p-5 shadow-lg sm:w-2/5"
        >
            <div className="flex flex-col gap-4">
                {/* Close Button */}
                <div className="flex w-full items-center justify-end">
                    <button
                        className="close-button text-4xl"
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>

                {/* Page Content */}
                <div className="flex-1">
                    {renderCurrentPage()}
                </div>

                {/* Navigation Footer */}
                <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-3">
                        {currentPage < 3 ? (
                            <button
                                onClick={handleNext}
                                disabled={
                                    (currentPage === 1 && !formData.whyInterested) || 
                                    (currentPage === 2 && !formData.opportunities)
                                }
                                className="bg-blue-500 text-white px-6 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.name || !formData.email}
                                className="bg-blue-500 text-white px-6 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit
                            </button>
                        )}

                        <button
                            onClick={handleCancel}
                            className="bg-white text-blue-500 border border-blue-500 px-6 py-2 rounded font-semibold"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="text-blue-500 font-semibold">
                        {currentPage}/3
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default VolunteerSignupModal;