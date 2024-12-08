import React from 'react';
import BackButton from '../components/Backbutton';

const HireFreelancerPage = () => {
  return (
    <>
    
    <div style={styles.page}>
    <BackButton/>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Learn How to Hire a Freelancer</h1>
        <p style={styles.headerSubtitle}>
          Step-by-step guide to hiring the perfect freelancer for your project.
        </p>
      </header>

      <main style={styles.main}>
        {steps.map((step, index) => (
          <section key={index} style={styles.section}>
            <img
              src={step.image}
              alt={step.title}
              style={styles.stepImage}
            />
            <div style={styles.textContent}>
              <h2 style={styles.stepTitle}>{step.title}</h2>
              <p style={styles.stepDescription}>{step.description}</p>
            </div>
          </section>
        ))}
      </main>

      <footer style={styles.footer}>
        <p style={{color:'yellow'}}>&copy; 2024 Barter4Skills. All Rights Reserved.</p>
      </footer>
    </div>
    </>
  );
};

const steps = [
  {
    title: 'Step 1: Define Your Project',
    description:
      'Clearly outline your project requirements, goals, and deadlines. The more details you provide, the better freelancers can understand your needs.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733590792/0f56c2e0-7962-4331-ab0d-7aff846ffd98.png',
  },
  {
    title: 'Step 2: Choose a Freelance Platform (Barter4Skills)',
    description:
      'Select a trusted freelance platform',
    image: 'https://res.cloudinary.com/dxbfhdvv7/image/upload/v1732599636/xhu6az8c9jmiqo3ele1j.png',
  },
  {
    title: 'Step 3: Post Your Job',
    description:  
      'Create a detailed job post with a clear title, description, budget, and timeline. Specify any skills or expertise required for the job.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591066/ca19595b-ac8d-4d44-8168-3a852592c3ec.png',
  },
  {
    title: 'Step 4: Review Applications',
    description:
      'Review freelancer applications and portfolios carefully. Shortlist candidates who meet your requirements and seem like a good fit.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591218/ef2a9686-4278-47cf-a704-47a86ef277c2.png',
  },
  {
    title: 'Step 5: Conduct Interviews',
    description:
      'Interview shortlisted freelancers to discuss project details and gauge their communication skills and expertise.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591323/0e46a9ce-6d2f-4f0d-b3be-085bb0955b4e.png    ',
  },
  {
    title: 'Step 6: Hire and Onboard',
    description:
      'Select the best freelancer, agree on terms, and provide all necessary resources for the project. Ensure a smooth onboarding process.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591721/8c22d37f-330d-4ab8-99a4-1efdd3fd497d.png',  
  },
  {
    title: 'Step 7: Monitor Progress',
    description:
      'Regularly communicate with the freelancer and provide feedback to ensure the project stays on track.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591615/f4cc935f-9ba7-41e4-8cb5-9ee186ec080b.png',
  },
  {
    title: 'Step 8: Complete and Review',
    description:
      'Once the project is finished, review the deliverables carefully, release payment, and leave a review for the freelancer.',
    image: 'https://res.cloudinary.com/dmcxbbr89/image/upload/v1733591523/24bddb43-c0d0-4961-bf7c-fbdcca18c389.png',
  },
];

const styles = {
  page: {
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f4f7f9',
    color: '#333',
    lineHeight: 1.6,
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#004aad',
    color: 'white',
    padding: '50px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
  },
  headerSubtitle: {
    fontSize: '1.2rem',
    margin: 0,
    fontWeight: '300',
    color:'yellow'
  },
  main: {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '0 20px',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    height: '200px', // Ensure uniform height
    maxWidth: '100%', // Maintain responsiveness
    boxSizing: 'border-box',
  },
  stepImage: {
    width: '150px', // Consistent width
    height: '150px', // Consistent height
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  textContent: {
    flex: 1, // Ensure the text content adapts
    marginLeft: '20px',
    overflow: 'hidden', // Handle overflow
  },

 
  stepTitle: {
    fontSize: '1.5rem',
    color: '#004aad',
    marginBottom: '10px',
  },
  stepDescription: {
    fontSize: '1rem',
    color: '#555',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#004aad',
    fontSize: '0.9rem',
    marginTop: '30px',
    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default HireFreelancerPage;