import { toast } from './toast';

export const generateUpiUrl = (payeeName: string, upiId: string, amount: string, note: string) => {
  const encodedPayeeName = encodeURIComponent(payeeName);
  const encodedNote = encodeURIComponent(note);

  return `upi://pay?pa=${upiId}&pn=${encodedPayeeName}&am=${amount}&cu=INR&tn=${encodedNote}`;
};

export const initiateUpiPayment = (
  payeeName: string,
  upiId: string,
  amount: string,
  note: string,
) => {
  const upiUrl = generateUpiUrl(payeeName, upiId, amount, note);

  // For mobile devices
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // Create a hidden anchor element
    const link = document.createElement('a');
    link.href = upiUrl;
    link.style.display = 'none';
    document.body.appendChild(link);

    // Trigger click and handle fallback
    setTimeout(() => {
      link.click();
      // Remove element after some time
      setTimeout(() => {
        document.body.removeChild(link);

        // If no UPI app opens after a timeout, show a message or redirect to alternative payment
        // This timeout gives time for the UPI app intent to process
        setTimeout(() => {
          // Check if user left the page (indicates successful opening of UPI app)
          if (document.hasFocus()) {
            toast.error(
              'No UPI payment app found. Please install a UPI app or try another payment method.',
            );
          }
        }, 2000);
      }, 100);
    }, 0);
  } else {
    toast.error(
      `Please scan the QR code in your mobile UPI app, or open this page on your mobile device.`,
    );
  }
};
