import React from 'react'

import './Pricing.css'
import Package from './Package'

const REST_LIFESPAN = new Date().getFullYear() - 2000

const scrollDown = () =>
  document.getElementById('pricing-notes').scrollIntoView(false)

const Sup = ({ children }) => (
  <a onClick={scrollDown} className="Sup">
    <sup>{children}</sup>
  </a>
)

const Pricing = () => (
  <section className="Pricing" id="pricing">
    <div className="Pricing-individual">
      <Package basic color="gray" />
      <Package
        pro
        color="purple"
        updatePeriod={
          <span>
            Free updates for two years
            <Sup>1</Sup>
          </span>
        }
        extraChapters={[
          'Server-side rendering',
          'Offline data and mutations',
          'Serverless',
          'Stripe integration'
        ]}
        videos={['Meet the authors', 'Introduction to the codebases']}
      />
      <Package
        full
        color="pink"
        recommended
        updatePeriod={
          <span>
            Free <b>lifetime</b> updates
            <Sup>2</Sup>
          </span>
        }
        extraChapters={[
          'Using the GitHub GraphQL API',
          'Schema stitching',
          'Rate limiting',
          'Caching with Redis'
        ]}
        videos={[
          'Code run-throughs of Chapters 6–11',
          'Interview with TBD interesting person'
        ]}
      />
      <Package training price="749" color="blue">
        <li>
          Everything in the Full edition, plus a day-long in-person training
          course
        </li>
        <hr />
        <li>Choose between the beginner course and the advanced course</li>
        <hr />
        <li>Full-stack JavaScript (React & Node)</li>
        <hr />
        <li>
          Advanced course topics include SSR, subscriptions, DataLoader, and
          Apollo Engine
        </li>
        <hr />
        <li>
          Taught by our favorite GraphQL teachers around—Paul and the team at{' '}
          <i>OK GROW!</i>
        </li>
        <hr />
        <li>
          Offered periodically in major cities in the U.S. and Canada (or if we
          get 15 signups in your area, we'll schedule a time to come to you)
        </li>
      </Package>
    </div>

    <div className="Pricing-notes" id="pricing-notes">
      <div className="Pricing-note">
        <sup>1</sup> Two years after v1.0 is released (all packages get free
        updates during the beta).
      </div>
      <div className="Pricing-note">
        <sup>2</sup> Free updates for the lifetime of the book. We'll keep it up
        to date for at least 4 years, but we hope to continue for as long as
        GraphQL is the best data-fetching system out there. (Which is probably a
        long time—REST has been around for {REST_LIFESPAN} years!)
      </div>
    </div>

    <Package team color="green">
      <li>
        Get a 30% discount over individual pricing by ordering a group license
        for your team. With a team license, five coworkers will get access to
        the Full edition.
      </li>{' '}
      <hr />
      <li>
        We can also arrange a day or two of on-site training for your company.
        Inquire at:
      </li>
      <p style={{ textAlign: 'center' }}>
        <a href="mailto:sales@graphql.guide">sales@graphql.guide</a>
      </p>
    </Package>
  </section>
)

export default Pricing
