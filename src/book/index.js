const books = [
  {
    type: 'default',
    display: '默认账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '工作账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '生活账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '游戏账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '文学账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '电脑账本',
    color: '#26a2ff'
  }, {
    type: 'customed',
    display: '生意账本',
    color: '#26a2ff'
  }
]

const getCurrentBookDisplay = () => '生意账本';

export default books;
export { getCurrentBookDisplay };