import React from 'react'
import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import auth0 from 'auth0-js'
import { initAuthHelpers, login, logout } from 'auth0-helpers'

const client = new auth0.WebAuth({
  domain: 'graphql.auth0.com',
  clientID: '8fErnZoF3hbzQ2AbMYu5xcS0aVNzQ0PC',
  responseType: 'token',
  audience: 'https://api.graphql.guide',
  scope: 'openid profile guide'
})

initAuthHelpers({
  client,
  usePopup: true,
  authOptions: {
    connection: 'github',
    owp: true,
    popupOptions: { height: 623 } // make tall enough for content
  },
  checkSessionOptions: {
    redirect_uri: window.location.origin
  },
  onError: e => console.error(e)
})

const USER_QUERY = gql`
  query UserQuery {
    currentUser {
      firstName
      name
      username
      email
      photo
      hasPurchased
    }
  }
`

const withUser = graphql(USER_QUERY, {
  props: ({ ownProps, data: { currentUser, loading, refetch } }) => ({
    currentUser,
    loading,
    refetch,
    ownProps
  })
})

function withAuth(BaseComponent) {
  class WithAuthWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        loggingIn: false
      }
    }

    login = () => {
      this.setState({ loggingIn: true })
      login({
        onCompleted: (e, t) => {
          e && console.log(e)
          this.props.refetch()
          this.setState({ loggingIn: false })
        }
      })
    }

    logout = () => {
      logout()
      this.props.refetch()
    }

    render() {
      const { currentUser, loading, ownProps } = this.props

      return (
        <BaseComponent
          user={currentUser}
          loading={loading || this.state.loggingIn}
          login={this.login}
          logout={this.logout}
          {...ownProps}
        />
      )
    }
  }

  WithAuthWrapper.propTypes = {
    currentUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      hasPurchased: PropTypes.string
    }),
    loading: PropTypes.bool.isRequired
  }

  WithAuthWrapper.displayName = wrapDisplayName(BaseComponent, 'withAuth')
  return withUser(WithAuthWrapper)
}

export default withAuth
