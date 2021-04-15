export const ADD_ITEM_TEMPLATE = {
  book: [
    {
      name: '图书名',
      value: 'name',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '作者',
      value: 'author',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '出版社',
      value: 'publisher',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '出版时间',
      value: 'publishTime',
      default: '2021-1-1',
      type: 'text',
      placeholder: '请输入出版时间（格式：年-月-日）',
      validator: (val) => {
        if (!val) {
          return '出版时间不能为空'
        }
        if (!isNaN(Date.parse(val))) {
          return true
        }
        return '出版时间格式不正确'
      }
    },
    {
      name: '封面',
      value: 'coverSrc',
      default: '',
    },
    {
      name: '内容简介',
      value: 'introduction',
      default: '',
      type: 'text',
    },
    {
      name: '作者简介',
      value: 'authorIntroduction',
      default: '',
      type: 'text',
    },
    {
      name: '分数',
      value: 'score',
      default: 0.0,
      type: 'digit',
      placeholder: '请输入分数（0.0 - 10.0）',
      validator: (val) => {
        if (val === '') {
          return '分数不能为空'
        }
        const num = parseFloat(val)
        if (isNaN(val) || isNaN(num)) {
          return '分数格式不正确'
        }
        if (num < 0 || num > 10) {
          return '分数应在 0 - 10之间'
        }
        return true
      }
    },
    {
      name: '类型',
      value: 'type',
      default: '',
      required: true
    }
  ],
  film: [
    {
      name: '电影名',
      value: 'name',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '外文名',
      value: 'foreignName',
      default: '',
      type: 'text'
    },
    {
      name: '上映时间',
      value: 'publishTime',
      default: '2021-1-1',
      type: 'text',
      placeholder: '请输入上映时间（格式：年-月-日）',
      validator: (val) => {
        if (!val) {
          return '上映时间不能为空'
        }
        if (!isNaN(Date.parse(val))) {
          return true
        }
        return '上映时间格式不正确'
      }
    },
    {
      name: '封面',
      value: 'coverSrc',
      default: '',
    },
    {
      name: '内容简介',
      value: 'introduction',
      default: '',
      type: 'text',
    },
    {
      name: '导演',
      value: 'director',
      default: '',
      type: 'text',
    },
    {
      name: '演员',
      value: 'actors',
      default: '',
      type: 'text',
    },
    {
      name: '分数',
      value: 'score',
      default: 0.0,
      type: 'digit',
      placeholder: '请输入分数（0.0 - 10.0）',
      validator: (val) => {
        if (val === '') {
          return '分数不能为空'
        }
        const num = parseFloat(val)
        if (isNaN(val) || isNaN(num)) {
          return '分数格式不正确'
        }
        if (num < 0 || num > 10) {
          return '分数应在 0 - 10之间'
        }
        return true
      }
    },
    {
      name: '国家',
      value: 'country',
      default: '',
      type: 'text',
      required: true,
      placeholder: '请输入国家（不同国家之间用空格隔开）'
    },
    {
      name: '类型',
      value: 'type',
      default: '',
      required: true
    }
  ],
  music: [
    {
      name: '音乐名',
      value: 'name',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '歌手',
      value: 'singer',
      default: '',
      type: 'text',
      required: true
    },
    {
      name: '发表时间',
      value: 'publishTime',
      default: '2021-1-1',
      type: 'text',
      placeholder: '请输入发表时间（格式：年-月-日）',
      validator: (val) => {
        if (!val) {
          return '发表时间不能为空'
        }
        if (!isNaN(Date.parse(val))) {
          return true
        }
        return '发表时间格式不正确'
      }
    },
    {
      name: '封面',
      value: 'coverSrc',
      default: '',
    },
    {
      name: '分数',
      value: 'score',
      default: 0.0,
      type: 'digit',
      placeholder: '请输入分数（0.0 - 10.0）',
      validator: (val) => {
        if (val === '') {
          return '分数不能为空'
        }
        const num = parseFloat(val)
        if (isNaN(val) || isNaN(num)) {
          return '分数格式不正确'
        }
        if (num < 0 || num > 10) {
          return '分数应在 0 - 10之间'
        }
        return true
      }
    },
    {
      name: '类型',
      value: 'type',
      default: '',
      required: true
    }
  ]
}
