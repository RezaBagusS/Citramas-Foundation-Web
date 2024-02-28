import React from "react";

interface CustSettingFieldProps {
  text?: string;
  label: string;
  type: string;
  placeholder?: string;
  regist?: any
}

const CustContactField = (({ label, placeholder, type }: CustSettingFieldProps) => {

  const lowerLabel = label.toLowerCase();

  return (
    <div className="text-custBlack flex flex-col gap-0">
      <label className="font-semibold text-base mb-1">{label}</label>
      {
        label == "Message" ? (
            <textarea
                placeholder={placeholder}
                required
                className="text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
            />
            ) : (
            <input
                type={type}
                placeholder={placeholder}
                required
                className="text-sm px-3 py-2 text-custBlack/70 rounded-md border active:outline-none focus:outline-none focus:border-custBlack/70 font-normal"
            />
        )
      }
    </div>
  );
});

export default CustContactField;