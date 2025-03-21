import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../redux/appSlice';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SendEmail = () => {
    const [formData, setFormData] = useState({
        recipients: "",
        subject: "",
        message: ""
    })
    const { open } = useSelector(store => store.app);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Check if the form data is valid
        if (!formData.recipients || !formData.subject || !formData.message) {
            alert("All fields are required!");
            return;
        }
        
        try {
            // Debugging to see if we have the correct form data
            console.log("Submitting form data: ", formData);

            // Add document to Firestore
            await addDoc(collection(db, "emails"), {
                to: formData.recipients,
                subject: formData.subject,
                message: formData.message,
                createdAt: serverTimestamp(),
            });

            // Close modal and reset form data
            dispatch(setOpen(false));
            setFormData({
                recipients: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Failed to send the email. Please try again.");
        }
    }

    const closeModal = () => {
        // Reset formData when modal is closed
        setFormData({
            recipients: "",
            subject: "",
            message: ""
        });
        dispatch(setOpen(false));
    }

    return (
        <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
            <div className='flex px-3 py-2 bg-[#F2F6FC] items-center justify-between rounded-t-md'>
                <h1>New Message</h1>
                <div onClick={closeModal} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                    <RxCross2 />
                </div>
            </div>
            <form onSubmit={submitHandler} className='flex flex-col p-3 gap-2'>
                <input
                    onChange={changeEventHandler}
                    name="recipients"
                    value={formData.recipients}
                    type="text"
                    placeholder='Recipients'
                    className='outline-none py-1'
                />
                <input
                    onChange={changeEventHandler}
                    name="subject"
                    value={formData.subject}
                    type="text"
                    placeholder='Subject'
                    className='outline-none py-1'
                />
                <textarea
                    onChange={changeEventHandler}
                    name="message"
                    value={formData.message}
                    id=""
                    cols="30"
                    rows="10"
                    className='outline-none py-1'
                ></textarea>
                <button type='submit' className='bg-[#0B57D0] rounded-full w-fit px-4 py-1 text-white font-medium'>
                    Send
                </button>
            </form>
        </div>
    )
}

export default SendEmail
