import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

type UpiQrCodeProps = {
  upiUrl: string;
  title?: string;
};

const UpiQrCode: React.FC<UpiQrCodeProps> = ({ upiUrl, title = 'Scan & Pay with UPI' }) => {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center space-y-4 rounded-xl bg-white">
      <QRCodeSVG value={upiUrl} size={100} />
      <h2 className="text-md text-center font-semibold">{title}</h2>
    </div>
  );
};

export default UpiQrCode;
