import CustContactField from "../atoms/custContactField";

const FormContact = () => {
  return (
    <form className="border bg-white drop-shadow-sm rounded-sm p-5">
        <h2 className="text-xl font-semibold text-custBlack">Send your messages</h2>
        <div className="flex flex-col gap-3 mt-5">
            <CustContactField label="Subject" placeholder="Talk to volunteer" type="text" />  
            <CustContactField label="Name" placeholder="Ahmad Zainal" type="text" />  
            <CustContactField label="Email" placeholder="ahmadzainal@gmail.com" type="text" />  
            <CustContactField label="Message" placeholder="I want to ..." type="text" />
        </div>
        <div className="flex justify-start items-center gap-4 mt-5">
            <button className="bg-custPrimary text-white rounded-md hover:bg-custPrimary/90 py-2 px-4">Send</button>
            <button className="text-custBlack/80 hover:underline">Reset</button>
        </div>
    </form>
  );
};

export default FormContact;
