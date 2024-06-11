import React from 'react'

function AboutUs() {
  return (
    <section>
      <div className="container mx-auto mt-8 p-6">
        <div className='lg:w-[470px] mx-auto'>
          <h2 className='heading text-center'>
            About Us
          </h2>
          <p className='text__para text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <br></br>
        <hr></hr>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Text */}
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              At Doctors Channeling, our mission is to provide a seamless and efficient platform for
              connecting patients with qualified doctors. We believe in making healthcare accessible to
              everyone, and our platform is designed to simplify the process of finding and scheduling
              appointments with healthcare professionals.
            </p>

            <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
            <p>
              Our vision is to create a healthcare ecosystem where patients can easily access quality
              medical services, and doctors can focus on delivering excellent patient care. We are
              committed to leveraging technology to improve the overall healthcare experience for
              individuals and communities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="mb-4">
                <img
                  src="https://png.pngtree.com/background/20230518/original/pngtree-doctor-doctor-male-asian-physician-picture-image_2646978.jpg"
                  alt="Team Member 1"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold mb-2">Dr. Brian Lee</h3>
                <p className="text-gray-700">Founder & CEO</p>
              </div>

              <div className="mb-4">
                <img
                  src="https://media.istockphoto.com/id/1330046035/photo/headshot-portrait-of-smiling-female-doctor-in-hospital.jpg?s=612x612&w=0&k=20&c=fsNQPbmFIxoKA-PXl3G745zj7Cvr_cFIGsYknSbz_Tg="
                  alt="Team Member 2"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold mb-2">Dr. Salmini Fonseka</h3>
                <p className="text-gray-700">Chief Medical Officer</p>
              </div>

              <div className="mb-4">
                <img
                  src="https://media.licdn.com/dms/image/D5603AQH3KUB__pwWAg/profile-displayphoto-shrink_800_800/0/1689235830511?e=2147483647&v=beta&t=GVZsYT_eLbkCUD8oVz1VuDofSDyCMmLvpwkBausmWCc"
                  alt="Team Member 3"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold mb-2">Dr. Michael Hettiarachi</h3>
                <p className="text-gray-700">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs