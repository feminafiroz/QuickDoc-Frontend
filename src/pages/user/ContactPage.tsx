import React, { ChangeEvent, FormEvent, useState } from 'react';
import contact from '../../assets/images/contact.png';
import aboutimg from '../../assets/images/heartt.png';
import Footer from '../../components/user/Footer/Footer';
import Navbar from '../../components/user/Navbar/navbar';

interface FormData {
  name: string;
  mobilenumber: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobilenumber?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobilenumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [msg, setMsg] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = (): boolean => {
    const { name, mobilenumber, email, subject, message } = formData;
    let formErrors: FormErrors = {};
    let isValid = true;

    if (name.trim() === "") {
      isValid = false;
      formErrors.name = "Name must be filled out";
    } else if (!/^[a-zA-Z.\s]+$/.test(name)) {
      isValid = false;
      formErrors.name = "Name must contain only alphabets and dot";
    }

    if (mobilenumber.trim() === "") {
      isValid = false;
      formErrors.mobilenumber = "Mobile Number must be filled out";
    } else if (isNaN(Number(mobilenumber))) {
      isValid = false;
      formErrors.mobilenumber = "Mobile Number must be Digits";
    } else if (mobilenumber.length !== 10) {
      isValid = false;
      formErrors.mobilenumber = "Mobile Number must have exactly 10 digits";
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      isValid = false;
      formErrors.email = "Email must be a valid email address";
    }

    if (subject.trim() === "") {
      isValid = false;
      formErrors.subject = "Subject must be filled out";
    }

    if (message.trim() === "") {
      isValid = false;
      formErrors.message = "Message must be filled out";
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbx-ke7vq96m5TIeKj0qga2nLQOdfBY5xm3LJ7Xz_5pDcSnsfqArQysOODMRcMbFjKjhwQ/exec';
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new FormData(document.getElementById('form') as HTMLFormElement),
        });
        if (response.ok) {
          setMsg('Sent Successfully');
          setTimeout(() => setMsg(''), 5000);
          setFormData({ name: '', mobilenumber: '', email: '', subject: '', message: '' });
        } else {
          console.error('Error!', response.statusText);
        }
      } catch (error) {
        console.error('Error!', error.message);
      }
    }
  };

  return (
    <>
      <div className="border-t-3 mt-4"></div>
      <section id="contact" className="contact py-8">
        <div className="container mx-auto px-4">
          <div className="section-title text-center">
            <h2 className="text-3xl font-semibold">Contact Us</h2>
          </div>
          <br />
          <div className="flex flex-wrap" data-aos="fade-in">
            <div className="w-full lg:w-5/12 flex items-stretch">
              <div className="info">
                {/* <div className="address mb-4">
                  <i className="bi bi-geo-alt text-2xl"></i>
                  <h4 className="text-lg font-bold">Location:</h4>
                  <p>Rhythm, Kochi, Kerala</p>
                </div> */}
                <div className="email mb-4">
                  <i className="bi bi-envelope text-2xl"></i>
                  <h4 className="text-lg font-bold">Email:</h4>
                  <p>quickdoc@gmail.com</p>
                </div>
                <div className="phone">
                  <i className="bi bi-phone text-2xl"></i>
                  <h4 className="text-lg font-bold">Call:</h4>
                  <p>+91 9074462392</p>
                </div>
                 {/* <div className="address mb-4">
                  <i className="bi bi-geo-alt text-2xl"></i>
                  <h4 className="text-lg font-bold">Location:</h4>
                  <p>Rhythm, Kochi, Kerala</p>
                </div> */}
                 <div className ="pl-20 pt-20">
                <img src={contact} alt="always empltetic" className='h-28'/>
                <h3 className='font-semibold'>Always empltetic</h3>
              </div>

              </div>
             
            </div>
            <div className="w-full lg:w-7/12 mt-5 lg:mt-0 flex items-stretch">
              <form id="form" method="post" role="form" className="php-email-form w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      className="form-control form-color w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="mobilenumber"
                      className="form-control form-color w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Mobile"
                      value={formData.mobilenumber}
                      onChange={handleInputChange}
                    />
                    {errors.mobilenumber && <span className="text-red-500">{errors.mobilenumber}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-color w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      className="form-control form-color w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                    {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                  </div>
                  <div className="form-group">
                    <textarea
                      id="message"
                      className="form-control form-color w-full p-2 border border-gray-300 rounded-md"
                      rows={5}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.message && <span className="text-red-500">{errors.message}</span>}
                  </div>
                  <div className="errmsg text-red-500">
                    <span id="msg1"></span>
                    <span id="msg">{msg}</span>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="button button-a button-big button-rouded form-color m-4 bg-green-700 hover:bg-green-600 text-white p-2 rounded-md"
                    >
                      Send Message
                    </button>
                  </div>
                  <div className="errmsg text-red-500">
                    <span id="msg1"></span>
                    <span id="msg">{msg}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[80vh]">
        <div className="absolute inset-0 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-between px-20 mx-20">
            <div className="max-w-max">
              <h1 className="text-5xl font-medium text-black mb-10">Contact QuickDoc</h1>
              <h2 className="text-2xl font-semibold text-black mb-8">Help us enable the best healthcare experience in India.</h2>
              {/* <button className="w-64 bg-green-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-green-600">
                Get Started
              </button> */}
            </div>
            <img src={aboutimg} alt="About img" className="w-1/2 h-auto" />
          </div>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </>
  );
};

export default AboutPage;
