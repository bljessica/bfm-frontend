export const KIND_DETAILS = {
  film: {
    NAME: '电影',
    UNIT: '部',
    STATUS_NAME: '看',
    TYPE_ICONS_URL: {
      '剧情': {
        imgUrl: '/static/images/typeIcons/film/plot.png'
      }, 
      '犯罪': {
        imgUrl: '/static/images/typeIcons/film/crime.png'
      }, 
      '悬疑': {
        imgUrl: '/static/images/typeIcons/film/cliffhang.png'
      }, 
      '喜剧': {
        imgUrl: '/static/images/typeIcons/film/comedy.png'
      }, 
      '古装': {
        imgUrl: '/static/images/typeIcons/film/ancient.png'
      }, 
      '爱情': {
        imgUrl: '/static/images/typeIcons/film/love.png'
      }, 
      '奇幻': {
        imgUrl: '/static/images/typeIcons/film/queer.png'
      }, 
      '惊悚': {
        imgUrl: '/static/images/typeIcons/film/terrible.png'
      }, 
      '传记': {
        imgUrl: '/static/images/typeIcons/film/biography.png'
      },
      '动作': {
        imgUrl: '/static/images/typeIcons/film/action.png'
      },
      '冒险': {
        imgUrl: '/static/images/typeIcons/film/adventure.png'
      },
      '情色': {
        imgUrl: '/static/images/typeIcons/film/affection.png'
      },
      '卡通': {
        imgUrl: '/static/images/typeIcons/film/cartoon.png'
      },
      '灾难': {
        imgUrl: '/static/images/typeIcons/film/catastrophe.png'
      },
      '儿童': {
        imgUrl: '/static/images/typeIcons/film/children.png'
      },
      '纪录片': {
        imgUrl: '/static/images/typeIcons/film/documentary.png'
      },
      '家庭': {
        imgUrl: '/static/images/typeIcons/film/family.png'
      },
      '历史': {
        imgUrl: '/static/images/typeIcons/film/history.png'
      },
      '同性': {
        imgUrl: '/static/images/typeIcons/film/homosexual.png'
      },
      '音乐': {
        imgUrl: '/static/images/typeIcons/film/song.png'
      },
      '科幻': {
        imgUrl: '/static/images/typeIcons/film/science_fiction.png'
      },
      '歌舞': {
        imgUrl: '/static/images/typeIcons/film/song_and_dance.png'
      },
      '运动': {
        imgUrl: '/static/images/typeIcons/film/sport.png'
      },
      '武侠': {
        imgUrl: '/static/images/typeIcons/film/swordsman.png'
      },
      '战争': {
        imgUrl: '/static/images/typeIcons/film/war.png'
      },
      '西部': {
        imgUrl: '/static/images/typeIcons/film/western.png'
      }
    }
  },
  book: {
    NAME: '图书',
    UNIT: '本',
    STATUS_NAME: '读',
    TYPE_ICONS_URL: {
      '计算机图书': {
        imgUrl: '/static/images/typeIcons/book/computer.png'
      },
      '名著': {
        imgUrl: '/static/images/typeIcons/book/masterpiece.png'
      },
      '小说': {
        imgUrl: '/static/images/typeIcons/book/novel.png'
      }
    }
  },
  music: {
    NAME: '音乐',
    UNIT: '首',
    STATUS_NAME: '听',
    TYPE_ICONS_URL: {
      '民谣': {
        imgUrl: '/static/images/typeIcons/music/folk_music.png'
      },
      '摇滚': {
        imgUrl: '/static/images/typeIcons/music/rock.png'
      },
      '流行': {
        imgUrl: '/static/images/typeIcons/music/pop.png'
      },
      '爵士': {
        imgUrl: '/static/images/typeIcons/music/jazz.png'
      },
      '原声': {
        imgUrl: '/static/images/typeIcons/music/voice.png'
      },
      'R&B': {
        imgUrl: '/static/images/typeIcons/music/R&B.png'
      },
      'DVD': {
        imgUrl: '/static/images/typeIcons/music/CD_DVD.png'
      },
      '说唱': {
        imgUrl: '/static/images/typeIcons/music/rap.png'
      },
      '轻音乐': {
        imgUrl: '/static/images/typeIcons/music/light_music.png'
      }
    }
  }
}

export const KIND_STATUS = {
  'book-want': '想读',
  'book-doing': '在读',
  'book-after': '读过',
  'film-want': '想看',
  'film-doing': '在看',
  'film-after': '看过',
  'music-want': '想听',
  'music-doing': '在听',
  'music-after': '听过',
}

export const USER_INFOS = {
  avatarUrl: '头像',
  city: '城市',
  gender: '性别',
  nickName: '昵称'
}

export const USER_GENDER = {
  1: '男',
  2: '女'
}

export const ADMIN_ACTIONS = {
  书籍管理: {
    color: '#5feaa4',
    actions: [
      {
        name: '添加图书',
        url: '/pages/admin/AdminAction?kind=book&actionType=add'
      },
      {
        name: '修改/删除图书',
        url: '/pages/Search?type=book&actionType=admin'
      }
    ]
  },
  电影管理: {
    color: '#84c9cf',
    actions: [
      {
        name: '添加电影',
        url: '/pages/admin/AdminAction?kind=film&actionType=add'
      },
      {
        name: '修改/删除电影',
        url: '/pages/Search?type=film&actionType=admin'
      }
    ]
  },
  音乐管理: {
    color: '#e5bbbe',
    actions: [
      {
        name: '添加音乐',
        url: '/pages/admin/AdminAction?kind=music&actionType=add'
      },
      {
        name: '修改/删除音乐',
        url: '/pages/Search?type=music&actionType=admin'
      }
    ]
  },
  用户管理: {
    color: '#c6c3bb',
    actions: [
      {
        name: '用户信息管理',
        url: '/pages/admin/UserInfoManagement'
      },
      {
        name: '评论管理',
        url: '/pages/comment/UserComments?showUsername=true'
      }
    ]
  }
}
