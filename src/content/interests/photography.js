// PHOTOGRAPHY / SELECTED WORKS
// 真实摄影作品全部使用原始文件与原始宽高比，不生成低分辨率缩略图。
// 页面仅使用 public/assets/interests/photography 下的归档副本；原始素材目录不被修改。

const archiveFile = (name) => `/assets/interests/photography/archive/${name}`
const graphicFile = (name) => `/assets/interests/photography/graphic-source/${name}`
const aiFile = (name) => `/assets/interests/photography/ai-source/${name}`

const photo = (name, data) => ({
  ...data,
  kind: 'photo',
  thumb: archiveFile(name),
  full: archiveFile(name),
})

export const photographyPage = {
  slug: 'photography',
  number: '02',
  en: 'PHOTOGRAPHY',
  cn: '摄影',
  themeEn: 'BEYOND THE LENS',
  themeCn: '记录真实，探索美感',
  archive: {
    total: 25,
    wall: 23,
    features: 2,
    label: '25 FRAMES / COMPLETE ARCHIVE',
  },
  workGroups: [
    {
      id: 'architecture',
      no: '01',
      en: 'ARCHITECTURE',
      cn: '建筑与几何',
      offsetB: '54px',
      offsetC: '108px',
    },
    {
      id: 'light',
      no: '02',
      en: 'LIGHT & COLOR',
      cn: '光与色',
      offsetB: '38px',
      offsetC: '76px',
    },
    {
      id: 'street',
      no: '03',
      en: 'STREET & DAILY',
      cn: '街头与日常',
      offsetB: '46px',
      offsetC: '92px',
    },
    {
      id: 'urban',
      no: '04',
      en: 'URBAN LANDSCAPE',
      cn: '城市景观',
      offsetB: '52px',
      offsetC: '104px',
    },
  ],
  hero: {
    image: archiveFile('Image_1746900995794.jpg'),
    full: archiveFile('Image_1746900995794.jpg'),
    group: 'architecture',
    alt: '砖石建筑的橙色内腔、台阶与规则窗格',
    meta: 'ORIGINAL FRAME / 3952 × 3048',
  },
  wall: [
    photo('Image_1746900970682.jpg', {
      id: 'stair-figure', group: 'architecture', col: 'a', width: '100%', offset: '0px',
      alt: '建筑楼梯间、白色栏杆与经过的人',
      meta: 'ARCHIVE / 3573 × 3043',
    }),
    photo('Image_1746900975866.jpg', {
      id: 'blue-facade', group: 'architecture', col: 'b', width: '100%', offset: '0px',
      alt: '蓝玻璃幕墙建筑仰视，冷色天空',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_1746900977054.jpg', {
      id: 'residential-grid', group: 'architecture', col: 'c', width: '100%', offset: '0px',
      alt: '建筑檐底的线性结构与远处的城市立面',
      meta: 'ARCHIVE / 3835 × 3048',
    }),
    photo('Image_1746900978118.jpg', {
      id: 'balcony-repeat', group: 'architecture', col: 'c', width: '100%', offset: '30px',
      alt: '重复阳台与窗格的斜角构图',
      meta: 'ARCHIVE / 3960 × 2784',
    }),
    photo('Image_1746900979776.jpg', {
      id: 'roof-apex', group: 'architecture', col: 'a', width: '88%', offset: '34px',
      alt: '白色屋面与天窗构成的尖角几何',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_1746900983429.jpg', {
      id: 'concrete-corner', group: 'architecture', col: 'b', width: '82%', offset: '24px',
      alt: '白色混凝土建筑转角',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_1746900980987.jpg', {
      id: 'roof-chevron', group: 'architecture', col: 'a', width: '92%', offset: '0px',
      alt: '白色折线屋脊与黑色檐口，低角度仰拍',
      meta: 'ARCHIVE / 4064 × 3048',
    }),

    photo('IMG_20250509_100905_edit_16130557943429.jpg', {
      id: 'gallery-pink', group: 'light', col: 'a', width: '82%', offset: '0px',
      alt: '粉紫色灯光下的展厅与装置',
      meta: '2025-05-09 / 2898 × 3044',
    }),
    photo('IMG_20250509_101454.jpg', {
      id: 'blue-hall-01', group: 'light', col: 'b', width: '88%', offset: '0px',
      alt: '蓝色灯光下的展厅、镜面地面与圆形装置',
      meta: '2025-05-09 / 4064 × 3048',
    }),
    photo('Image_68787604237559.jpg', {
      id: 'courtyard-night', group: 'light', col: 'c', width: '100%', offset: '0px',
      alt: '夜间木构庭院与暖色灯光',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('IMG_20230727_145509-01.jpeg', {
      id: 'memorial-red', group: 'light', col: 'a', width: '100%', offset: '30px',
      alt: '刻着红字的石头与红色旗帜',
      meta: '2023-07-27 / 4064 × 3048',
    }),
    photo('IMG_20230727_145346.jpg', {
      id: 'red-hall', group: 'light', col: 'b', width: '92%', offset: '28px',
      alt: '红色灯光下的群像浮雕与展厅',
      meta: '2023-07-27 / 4064 × 3048',
    }),
    photo('IMG_20250509_102027.jpg', {
      id: 'blue-hall-02', group: 'light', col: 'c', width: '100%', offset: '26px',
      alt: '蓝色灯光展厅、圆形装置与镜面地面',
      meta: '2025-05-09 / 4000 × 3000',
    }),

    photo('Image_233449271305528.jpg', {
      id: 'country-road', group: 'street', col: 'a', width: '100%', offset: '0px',
      alt: '林间乡道与倾斜的树影',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_235494926615997.jpg', {
      id: 'old-house', group: 'street', col: 'b', width: '82%', offset: '0px',
      alt: '老砖房、门框与春联',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_1746900982393.jpg', {
      id: 'street-sign', group: 'street', col: 'c', width: '100%', offset: '0px',
      alt: '夜间店铺立面、灯笼与金色招牌',
      meta: 'ARCHIVE / 4064 × 2723',
    }),
    photo('Image_233446706288966.jpg', {
      id: 'straw-yard', group: 'street', col: 'a', width: '100%', offset: '30px',
      alt: '树荫下覆盖着编织物的草垛与旧院角落',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_233452183229120.jpg', {
      id: 'rider-street', group: 'street', col: 'b', width: '100%', offset: '38px',
      alt: '从车窗看到的骑手、街道与树影',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('Image_1746900986833.jpg', {
      id: 'wood-lantern', group: 'street', col: 'c', width: '100%', offset: '32px',
      alt: '夜色里的木构建筑、两盏灯笼与木栏杆',
      meta: 'ARCHIVE / 3041 × 1819',
    }),
    photo('Image_233839354735171.jpg', {
      id: 'woodpile-yard', group: 'street', col: 'a', width: '96%', offset: '0px',
      alt: '堆叠的木柴、砖墙与树影',
      meta: 'ARCHIVE / 3948 × 3046',
    }),

    photo('Image_68790972895943.jpg', {
      id: 'water-blue-hour', group: 'urban', col: 'a', width: '100%', offset: '0px',
      alt: '蓝调时刻的城市水岸与建筑倒影',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
    photo('IMG_20261119_005529.jpg', {
      id: 'skyline-sunset', group: 'urban', col: 'b', width: '92%', offset: '0px',
      alt: '城市夕阳天际线与水面',
      meta: '2025-11-15 / 4064 × 2499',
    }),
    photo('Image_68791862089849.jpg', {
      id: 'city-blue-night', group: 'urban', col: 'c', width: '100%', offset: '0px',
      alt: '深蓝色夜色里的城市天际线与水面反光',
      meta: 'ARCHIVE / 4064 × 3048',
    }),
  ],
  interlude: {
    image: archiveFile('Image_1746900985737.jpg'),
    full: archiveFile('Image_1746900985737.jpg'),
    group: 'street',
    alt: '红灯笼、砖墙与石阶组成的夜间入口',
    meta: 'ARCHIVE / 4064 × 3048',
  },
  posters: {
    kicker: 'POST / ADOBE PHOTOSHOP',
    title: 'GRAPHIC STUDY',
    note: '09 PS SOURCE FILES / ORIGINAL',
    items: [
      { id: 'poster-01', no: '01', kind: 'graphic', thumb: graphicFile('Image_233418824908977.jpg'), full: graphicFile('Image_233418824908977.jpg'), alt: '黑底烟花与「星河璀璨」题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 01', meta: 'GRAPHIC / PS / 3816 × 2800' },
      { id: 'poster-02', no: '02', kind: 'graphic', thumb: graphicFile('Image_233421980288142.jpg'), full: graphicFile('Image_233421980288142.jpg'), alt: '黑底烟花与英文题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 02', meta: 'GRAPHIC / PS / 3388 × 3048' },
      { id: 'poster-03', no: '03', kind: 'graphic', thumb: graphicFile('Image_233424239133298.jpg'), full: graphicFile('Image_233424239133298.jpg'), alt: '黑底烟花与「Dark Night Stars」题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 03', meta: 'GRAPHIC / PS / 2959 × 2896' },
      { id: 'poster-04', no: '04', kind: 'graphic', thumb: graphicFile('Image_233430998539649.jpg'), full: graphicFile('Image_233430998539649.jpg'), alt: '黑底烟花与英文题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 04', meta: 'GRAPHIC / PS / 2456 × 2864' },
      { id: 'poster-05', no: '05', kind: 'graphic', thumb: graphicFile('Image_233432914691680.jpg'), full: graphicFile('Image_233432914691680.jpg'), alt: '黑底烟花与英文题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 05', meta: 'GRAPHIC / PS / 2432 × 2936' },
      { id: 'poster-06', no: '06', kind: 'graphic', thumb: graphicFile('Image_233434875399596.jpg'), full: graphicFile('Image_233434875399596.jpg'), alt: '黑底烟花与英文题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 06', meta: 'GRAPHIC / PS / 2491 × 2104' },
      { id: 'poster-07', no: '07', kind: 'graphic', thumb: graphicFile('Image_233436619204647.jpg'), full: graphicFile('Image_233436619204647.jpg'), alt: '黑底烟花与「Moonlight Flowing Light」题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 07', meta: 'GRAPHIC / PS / 3448 × 2784' },
      { id: 'poster-08', no: '08', kind: 'graphic', thumb: graphicFile('Image_233439178638657.jpg'), full: graphicFile('Image_233439178638657.jpg'), alt: '黑底烟花与英文题字的 Photoshop 视觉海报', label: 'FIREWORK STUDY 08', meta: 'GRAPHIC / PS / 3600 × 3048' },
      { id: 'poster-09', no: '09', kind: 'graphic', thumb: graphicFile('Image_233444149221832.jpg'), full: graphicFile('Image_233444149221832.jpg'), alt: '黑底火焰与「Fire Spirit」题字的 Photoshop 视觉海报', label: 'FIRE SPIRIT / STUDY 09', meta: 'GRAPHIC / PS / 4064 × 3048' },
    ],
  },
  aiNote: {
    kicker: 'AI / OPTIMIZED',
    title: 'AI 视觉实验',
    body: 'AI 在原始摄影作品上进行视觉优化增强。',
    items: [
      {
        id: 'ai-01', no: '01', kind: 'ai', label: 'GOLDEN PAVILION', cn: ' ',
        thumb: aiFile('1790529266616.png'), full: aiFile('1790529266616.png'),
        alt: '暖金色夕照下的园林亭廊、湖面倒影与远处住宅楼',
        meta: 'AI-OPTIMIZED / 2601 × 1508',
      },
      {
        id: 'ai-02', no: '02', kind: 'ai', label: 'BLUE CORRIDOR', cn: ' ',
        thumb: aiFile('1790529614480.png'), full: aiFile('1790529614480.png'),
        alt: '蓝色储物柜与湿滑地面反射出的长廊',
        meta: 'AI-OPTIMIZED / 2326 × 1708',
      },
      {
        id: 'ai-03', no: '03', kind: 'ai', label: 'ORANGE SKY', cn: ' ',
        thumb: aiFile('31f20ae62ba903e13909ce0b02b7d2a2(AI).jpg'), full: aiFile('31f20ae62ba903e13909ce0b02b7d2a2(AI).jpg'),
        alt: '橙红晚霞下的住宅楼群剪影',
        meta: 'AI-OPTIMIZED / 1093 × 1093',
      },
      {
        id: 'ai-04', no: '04', label: 'NIGHT WALK', cn: ' ', kind: 'ai',
        thumb: aiFile('IMG_20260927_161529(AI).png'), full: aiFile('IMG_20260927_161529(AI).png'),
        alt: '夜间路灯照亮的林间步道与住宅楼',
        meta: 'AI-OPTIMIZED / 2303 × 1577',
      },
    ],
  },
}
