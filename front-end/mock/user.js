
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: [{
      name: 'example',
      children: [{
        name: 'table',
        children: []
      }, {
        name: 'tree',
        children: []
      }]
    }, {
      name: 'form',
      children: [{
        name: 'formIndex',
        children: []
      }]
    }, {
      name: 'nested',
      children: [{
        name: 'menu1',
        children: [{
          name: 'menu1-1',
          children: []
        }, {
          name: 'menu1-2',
          children: [{
            name: 'menu1-2-1',
            children: []
          }, {
            name: 'menu1-2-2',
            children: []
          }]
        }, {
          name: 'menu1-3',
          children: []
        }]
      }, {
        name: 'menu2',
        children: []
      }]
    }],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: [{
      name: 'example',
      children: [{
        name: 'table',
        children: []
      }, {
        name: 'tree',
        children: []
      }]
    }, {
      name: 'form',
      children: [{
        name: 'formIndex',
        children: []
      }]
    }],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
