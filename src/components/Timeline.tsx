import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>

          {/* Graphic Designer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="2020 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Graphic Designer</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Creating visual designs for digital and print media, brand identity, and marketing assets.
            </p>
          </VerticalTimelineElement>

          {/* Video Editor */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2021 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Video Editor</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Editing video content for social media, advertisements, and promotional campaigns.
            </p>
          </VerticalTimelineElement>

          {/* Digital Marketer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2021 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Digital Marketer</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Managing online campaigns, social media strategy, SEO, and digital branding initiatives.
            </p>
          </VerticalTimelineElement>

          {/* Front End Engineer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2021 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Front End Engineer</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Developing responsive web applications, implementing UI/UX, and optimizing performance.
            </p>
          </VerticalTimelineElement>

          {/* Startup Founder */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2024 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Startup Founder</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Founder & CMO of Dataktif, a startup AI company specializing in on-premise data analytics solutions.
            </p>
          </VerticalTimelineElement>

          {/* Data Analyst Intern */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2020 - 2020"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Data Analyst Intern</h3>
            <h4 className="vertical-timeline-element-subtitle">Jakarta, Indonesia</h4>
            <p>
              Automation, Data Governance, and Statistical Analysis.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;




// import React from "react";
// import '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
// import '../assets/styles/Timeline.scss'

// function Timeline() {
//   return (
//     <div id="history">
//       <div className="items-container">
//         <h1>Career History</h1>
//         <VerticalTimeline>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
//             contentArrowStyle={{ borderRight: '7px solid  white' }}
//             date="2022 - present"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Technology Consultant</h3>
//             <h4 className="vertical-timeline-element-subtitle">Dallas, TX</h4>
//             <p>
//               Full-stack Web Development, GenAI/LLM, Project Management, Business Development
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2020 - 2022"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Full Stack Engineer</h3>
//             <h4 className="vertical-timeline-element-subtitle">Laie, HI</h4>
//             <p>
//               Frontend Development, Backend Development, User Experience, Team Leading
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2021 - 2021"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Staff Engineer Intern</h3>
//             <h4 className="vertical-timeline-element-subtitle">Laie, HI</h4>
//             <p>
//               Full-stack Development, API Development, User Experience
//             </p>
//           </VerticalTimelineElement>
//           <VerticalTimelineElement
//             className="vertical-timeline-element--work"
//             date="2020 - 2020"
//             iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
//             icon={<FontAwesomeIcon icon={faBriefcase} />}
//           >
//             <h3 className="vertical-timeline-element-title">Data Analyst Intern</h3>
//             <h4 className="vertical-timeline-element-subtitle">Tokyo, Japan</h4>
//             <p>
//               Automation, Data Governance, Statistical Analysis
//             </p>
//           </VerticalTimelineElement>
//         </VerticalTimeline>
//       </div>
//     </div>
//   );
// }

// export default Timeline;