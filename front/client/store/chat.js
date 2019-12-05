export const state = () => ({
  teams: [
    { name: '두산 베어스', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/doosan.png', initial: 'doosan' },
    { name: 'LG 트윈스', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/lg.png', initial: 'lg' },
    { name: '기아 타이거즈', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/kia.png', initial: 'kia' },
    { name: '롯데 자이언츠', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/lotte.png', initial: 'lotte' },
    { name: 'NC 다이노스', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/nc.png', initial: 'nc' },
    { name: '삼성 라이온즈', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/samsung.png', initial: 'samsung' },
    { name: 'KT 위즈', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/kt.png', initial: 'kt' },
    { name: '키움 히어로즈', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/kium.png', initial: 'kium' },
    { name: 'SK 와이번스', src: 'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/sk.png', initial: 'sk' },
    { name: '한화 이글스', src:'https://yaguwagu.s3.ap-northeast-2.amazonaws.com/client/img/icon/hanwha.png', initial: 'hanwha' }
  ],
  selectedTeam: 'doosan'
});

export const mutations = {
  selTeam(state, payload) {
    state.selectedTeam = payload;
  }
}