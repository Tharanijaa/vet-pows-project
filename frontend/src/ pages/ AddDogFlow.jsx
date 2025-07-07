import React, { useState } from 'react';
import DogInfoStep from './DogInfoStep';
import OwnerInfoStep from './OwnerInfoStep';
import PaymentStep from './pages/p';
import SuccessStep from './SuccessStep';

const AddDogFlow = ({ onClose, onDogAdded }) => {
  const [step, setStep] = useState(1);

  const [dogInfo, setDogInfo] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    healthIssues: '',
    profilePic: '',
  });

  const [ownerInfo, setOwnerInfo] = useState({
    ownerName: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: '',
    transactionId: '',
  });

  // ✅ Move to next step
  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
        {step === 1 && (
          <DogInfoStep formData={dogInfo} setFormData={setDogInfo} onNext={next} onClose={onClose} />
        )}
        {step === 2 && (
          <OwnerInfoStep formData={ownerInfo} setFormData={setOwnerInfo} onNext={next} onBack={back} />
        )}
        {step === 3 && (
          <PaymentStep
            dogInfo={dogInfo}
            ownerInfo={ownerInfo}
            formData={paymentInfo}
            setFormData={setPaymentInfo}
            onNext={next}
            onBack={back}
            onDogAdded={onDogAdded}
          />
        )}
        {step === 4 && (
          <SuccessStep />
        )}
      </div>
    </div>
  );
};

export default AddDogFlow;
