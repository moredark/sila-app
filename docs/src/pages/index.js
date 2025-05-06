import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro">
            Перейти к документации
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureItem({title, description, icon, link, linkText}) {
  return (
    <div className="col col--6" style={{marginBottom: '2rem'}}>
      <div className={styles.feature}>
        <div className={styles.featureIcon}>{icon}</div>
        <h2>{title}</h2>
        <div>{description}</div>
        <Link to={link} className="button button--primary button--lg">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

function QuickLinkItem({title, description, link}) {
  return (
    <div className="col col--4" style={{marginBottom: '2rem'}}>
      <div className={styles.quickCard}>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link}>Подробнее →</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  
  const features = [
    {
      title: 'Backend',
      description: (
        <>
          Документация по серверной части приложения, включая:
          <ul className={styles.featureList}>
            <li>Архитектуру приложения</li>
            <li>API-эндпоинты</li>
            <li>Схему базы данных</li>
            <li>Бизнес-логику</li>
          </ul>
        </>
      ),
      icon: '🔧',
      link: '/backend/intro',
      linkText: 'Документация бэкенда'
    },
    {
      title: 'Frontend',
      description: (
        <>
          Документация по клиентской части, включая:
          <ul className={styles.featureList}>
            <li>Feature-Sliced Design</li>
            <li>Компонентную структуру</li>
            <li>Работу с состоянием</li>
            <li>Гайдлайны разработки</li>
          </ul>
        </>
      ),
      icon: '🎨',
      link: '/frontend/intro',
      linkText: 'Документация фронтенда'
    },
  ];

  const quickLinks = [
    {
      title: 'Начало работы',
      description: 'Быстрый старт с проектом и основные сведения',
      link: '/intro'
    },
    {
      title: 'FSD Архитектура',
      description: 'Структура Feature-Sliced Design и лучшие практики',
      link: '/frontend/fsd'
    },
    {
      title: 'API Документация',
      description: 'Описание эндпоинтов и взаимодействия с сервером',
      link: '/backend/intro'
    }
  ];

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Документация проекта Sila App">
      <HomepageHeader />
      
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row" style={{justifyContent: 'center'}}>
              {features.map((feature, idx) => (
                <FeatureItem key={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>
        
        <section className={styles.quickLinks}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Быстрые ссылки</h2>
            <div className="row" style={{justifyContent: 'center'}}>
              {quickLinks.map((item, idx) => (
                <QuickLinkItem key={idx} {...item} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 