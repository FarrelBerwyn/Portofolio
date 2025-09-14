import React from "react";
import { useTranslation } from 'react-i18next';
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

export default function Timeline(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div id="history">
      <div className="items-container">
        <h1>{t('timeline.title')}</h1>
        <VerticalTimeline>
          {/* Graphic Designer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2020 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.graphicDesigner.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.graphicDesigner.location')}</h4>
            <p>{t('timeline.jobs.graphicDesigner.description')}</p>
          </VerticalTimelineElement>

          {/* Video Editor */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2021 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.videoEditor.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.videoEditor.location')}</h4>
            <p>{t('timeline.jobs.videoEditor.description')}</p>
          </VerticalTimelineElement>

          {/* Digital Marketer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2021 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.digitalMarketer.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.digitalMarketer.location')}</h4>
            <p>{t('timeline.jobs.digitalMarketer.description')}</p>
          </VerticalTimelineElement>

          {/* Front End Engineer */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2021 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.frontEndEngineer.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.frontEndEngineer.location')}</h4>
            <p>{t('timeline.jobs.frontEndEngineer.description')}</p>
          </VerticalTimelineElement>

          {/* Startup Founder */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2024 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.startupFounder.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.startupFounder.location')}</h4>
            <p>{t('timeline.jobs.startupFounder.description')}</p>
          </VerticalTimelineElement>

          {/* Researcher */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date={`2025 - ${t('timeline.present')}`}
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">{t('timeline.jobs.researcher.title')}</h3>
            <h4 className="vertical-timeline-element-subtitle">{t('timeline.jobs.researcher.location')}</h4>
            <p>{t('timeline.jobs.researcher.description')}</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}




