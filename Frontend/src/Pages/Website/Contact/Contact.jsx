import React from "react";

import {
    MapPin,
    Phone,
    Mail,
    Clock3,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
    return (
        <div className="bg-[#f7fbff] min-h-screen overflow-hidden">
            {/* HERO */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}

                    <div>
                        <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                            Contact Us
                        </p>

                        <h1 className="text-5xl lg:text-7xl font-black text-slate-800 leading-tight mb-8">
                            We’re Always
                            <br />
                            Here To Help
                        </h1>

                        <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
                            Whether you need
                            emergency support,
                            doctor appointments,
                            ambulance services,
                            or healthcare
                            information, our
                            support team is
                            always ready to help
                            you.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black transition duration-300 shadow-lg shadow-blue-200">
                                Contact Support
                            </button>

                            <button className="border border-blue-200 bg-white hover:bg-blue-50 text-slate-700 px-8 py-4 rounded-3xl font-black transition duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}

                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

                        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative bg-white border border-blue-100 rounded-[45px] p-5 shadow-xl shadow-blue-100">
                            <img
                                src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                                alt="Contact"
                                className="w-full h-[550px] object-cover rounded-[35px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTACT INFO */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    <InfoCard
                        icon={
                            <Phone
                                size={
                                    34
                                }
                            />
                        }
                        title="Phone Number"
                        value="+880 1700-000000"
                    />

                    <InfoCard
                        icon={
                            <Mail
                                size={
                                    34
                                }
                            />
                        }
                        title="Email Address"
                        value="hospital@gmail.com"
                    />

                    <InfoCard
                        icon={
                            <MapPin
                                size={
                                    34
                                }
                            />
                        }
                        title="Location"
                        value="Dhaka, Bangladesh"
                    />

                    <InfoCard
                        icon={
                            <Clock3
                                size={
                                    34
                                }
                            />
                        }
                        title="Working Hours"
                        value="24/7 Emergency"
                    />
                </div>
            </div>

            {/* FORM SECTION */}

            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* LEFT */}

                        <div>
                            <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                                Send Message
                            </p>

                            <h2 className="text-5xl font-black text-slate-800 leading-tight mb-8">
                                Let’s Talk
                                About Your
                                Health
                            </h2>

                            <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                Fill out the form
                                below and our
                                hospital support
                                team will contact
                                you as soon as
                                possible.
                            </p>

                            {/* SOCIAL */}

                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-5">
                                    Follow Us
                                </h3>

                                <div className="flex items-center gap-4">
                                    <SocialButton
                                        icon={
                                            <FaFacebookF />
                                        }
                                    />

                                    <SocialButton
                                        icon={
                                            <FaInstagram />
                                        }
                                    />

                                    <SocialButton
                                        icon={
                                            <FaLinkedinIn />
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* FORM */}

                        <div className="bg-[#f7fbff] border border-blue-100 rounded-[45px] p-8 shadow-sm">
                            <form className="space-y-6">
                                {/* NAME */}

                                <div>
                                    <label className="block text-slate-700 font-black mb-3">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full h-16 rounded-3xl border border-blue-100 bg-white px-6 outline-none focus:border-blue-500 font-semibold"
                                    />
                                </div>

                                {/* EMAIL */}

                                <div>
                                    <label className="block text-slate-700 font-black mb-3">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full h-16 rounded-3xl border border-blue-100 bg-white px-6 outline-none focus:border-blue-500 font-semibold"
                                    />
                                </div>

                                {/* PHONE */}

                                <div>
                                    <label className="block text-slate-700 font-black mb-3">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter phone number"
                                        className="w-full h-16 rounded-3xl border border-blue-100 bg-white px-6 outline-none focus:border-blue-500 font-semibold"
                                    />
                                </div>

                                {/* SUBJECT */}

                                <div>
                                    <label className="block text-slate-700 font-black mb-3">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter subject"
                                        className="w-full h-16 rounded-3xl border border-blue-100 bg-white px-6 outline-none focus:border-blue-500 font-semibold"
                                    />
                                </div>

                                {/* MESSAGE */}

                                <div>
                                    <label className="block text-slate-700 font-black mb-3">
                                        Message
                                    </label>

                                    <textarea
                                        rows="6"
                                        placeholder="Write your message..."
                                        className="w-full rounded-3xl border border-blue-100 bg-white p-6 outline-none focus:border-blue-500 font-semibold resize-none"
                                    ></textarea>
                                </div>

                                {/* BUTTON */}

                                <button
                                    type="submit"
                                    className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black transition duration-300 shadow-lg shadow-blue-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAP */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 rounded-full"></div>

                    <div className="relative bg-white border border-blue-100 rounded-[45px] overflow-hidden shadow-xl shadow-blue-100">
                        <iframe
                            title="Hospital Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.033956213395!2d90.41251887512261!3d23.777176178640105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a6d0a3e72b%3A0x7a6d962f8d833b0d!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                            width="100%"
                            height="500"
                            allowFullScreen=""
                            loading="lazy"
                            className="border-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

// INFO CARD

const InfoCard = ({
    icon,
    title,
    value,
}) => {
    return (
        <div className="bg-white border border-blue-100 rounded-[40px] p-8 shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-2xl hover:shadow-blue-100">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                {icon}
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-3">
                {title}
            </h3>

            <p className="text-slate-500 text-lg leading-relaxed">
                {value}
            </p>
        </div>
    );
};

// SOCIAL BUTTON

const SocialButton = ({
    icon,
}) => {
    return (
        <button className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition duration-300 text-xl shadow-lg shadow-blue-200">
            {icon}
        </button>
    );
};

export default Contact;