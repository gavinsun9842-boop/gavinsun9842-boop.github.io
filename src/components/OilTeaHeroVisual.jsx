// AI 智启油茶香 Hero：抽象金属环、茶叶与琥珀流体，12 秒叙事循环。
// 只由 ProjectHero 在 heroVisual === 'oiltea' 时挂载；不呈现真实设备或机械内部结构。

import { useEffect, useId, useRef } from 'react'
import './OilTeaHeroVisual.css'

export default function OilTeaHeroVisual() {
  const rootRef = useRef(null)
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `${uid}-${name}`

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle('is-paused', !entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(root)

    const onVisibility = () => root.classList.toggle('is-page-hidden', document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <figure className="oiltea-visual" ref={rootRef} aria-hidden="true">
      <div className="oiltea-glow oiltea-glow-left" />
      <div className="oiltea-glow oiltea-glow-right" />

      <svg
        className="oiltea-art"
        viewBox="0 0 1000 1250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={id('metal')} x1="168" y1="184" x2="780" y2="1090" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4D49A" stopOpacity="0.96" />
            <stop offset="0.2" stopColor="#D9A866" stopOpacity="0.72" />
            <stop offset="0.42" stopColor="#8B7041" stopOpacity="0.34" />
            <stop offset="0.63" stopColor="#E5A64E" stopOpacity="0.76" />
            <stop offset="0.82" stopColor="#8A5A33" stopOpacity="0.38" />
            <stop offset="1" stopColor="#C18A4D" stopOpacity="0.64" />
          </linearGradient>

          <linearGradient id={id('metalInner')} x1="300" y1="260" x2="760" y2="990" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0C98A" stopOpacity="0.9" />
            <stop offset="0.38" stopColor="#C18A4D" stopOpacity="0.42" />
            <stop offset="0.66" stopColor="#E5A64E" stopOpacity="0.68" />
            <stop offset="1" stopColor="#7A4A28" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id={id('edgeLight')} x1="190" y1="290" x2="760" y2="930" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF2D6" stopOpacity="0.9" />
            <stop offset="0.36" stopColor="#F4D49A" stopOpacity="0.44" />
            <stop offset="0.7" stopColor="#C18A4D" stopOpacity="0.16" />
            <stop offset="1" stopColor="#E5A64E" stopOpacity="0.42" />
          </linearGradient>

          <linearGradient id={id('leafA')} x1="186" y1="400" x2="486" y2="238" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3A2414" stopOpacity="0.28" />
            <stop offset="0.44" stopColor="#8B7041" stopOpacity="0.56" />
            <stop offset="0.8" stopColor="#C18A4D" stopOpacity="0.46" />
            <stop offset="1" stopColor="#F4D49A" stopOpacity="0.24" />
          </linearGradient>

          <linearGradient id={id('leafB')} x1="646" y1="962" x2="910" y2="788" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3A2414" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#8B7041" stopOpacity="0.46" />
            <stop offset="1" stopColor="#C18A4D" stopOpacity="0.58" />
          </linearGradient>

          <linearGradient id={id('amber')} x1="130" y1="1110" x2="912" y2="302" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A95D27" stopOpacity="0.08" />
            <stop offset="0.3" stopColor="#C18A4D" stopOpacity="0.52" />
            <stop offset="0.52" stopColor="#E5A64E" stopOpacity="0.96" />
            <stop offset="0.78" stopColor="#F4D49A" stopOpacity="0.72" />
            <stop offset="1" stopColor="#E5A64E" stopOpacity="0.14" />
          </linearGradient>

          <radialGradient id={id('aura')} cx="0.52" cy="0.49" r="0.58">
            <stop stopColor="#E5A64E" stopOpacity="0.24" />
            <stop offset="0.4" stopColor="#C18A4D" stopOpacity="0.15" />
            <stop offset="1" stopColor="#090807" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={id('innerLight')} cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#F4D49A" stopOpacity="0.25" />
            <stop offset="0.52" stopColor="#E5A64E" stopOpacity="0.12" />
            <stop offset="1" stopColor="#E5A64E" stopOpacity="0" />
          </radialGradient>

          <filter id={id('blurWide')} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
          <filter id={id('blurSoft')} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id={id('glow')} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id={id('leafBlur')} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <g className="oiltea-composition">
          <ellipse cx="520" cy="640" rx="390" ry="500" fill={`url(#${id('aura')})`} filter={`url(#${id('blurWide')})`} className="oiltea-aura" />

          <g className="oiltea-ghost">
            <ellipse cx="538" cy="610" rx="372" ry="468" transform="rotate(-28 538 610)" stroke="#8B7041" strokeOpacity="0.14" strokeWidth="1.2" filter={`url(#${id('blurSoft')})`} />
            <ellipse cx="470" cy="660" rx="300" ry="410" transform="rotate(46 470 660)" stroke="#C18A4D" strokeOpacity="0.08" strokeWidth="1" filter={`url(#${id('blurSoft')})`} />
          </g>

          <g className="oiltea-ring oiltea-ring-outer">
            <g transform="rotate(-18 500 610)">
              <ellipse cx="500" cy="610" rx="352" ry="438" stroke="#C18A4D" strokeOpacity="0.14" strokeWidth="28" filter={`url(#${id('blurSoft')})`} />
              <path
                d="M148 610 C148 380 290 214 500 172 C640 145 764 220 822 340 L792 368 C736 268 636 210 500 236 C330 292 198 408 186 610 Z"
                fill={`url(#${id('metal')})`}
                fillOpacity="0.2"
                stroke="#D9A866"
                strokeOpacity="0.22"
                strokeWidth="0.9"
              />
              <path d="M154 610 C156 384 296 222 500 181 C634 156 748 222 806 330" stroke="#FFF0CE" strokeOpacity="0.32" strokeWidth="1.2" strokeLinecap="round" />
              <ellipse cx="500" cy="610" rx="352" ry="438" stroke="#1E1006" strokeOpacity="0.72" strokeWidth="20" transform="translate(5 7)" />
              <ellipse cx="500" cy="610" rx="352" ry="438" stroke="#4A2C17" strokeOpacity="0.66" strokeWidth="15" />
              <ellipse cx="500" cy="610" rx="352" ry="438" stroke={`url(#${id('metal')})`} strokeWidth="11" />
              <ellipse cx="500" cy="610" rx="346" ry="431" stroke="#FFF0CE" strokeOpacity="0.62" strokeWidth="1.5" />
              <ellipse cx="500" cy="610" rx="359" ry="445" stroke="#6E4528" strokeOpacity="0.62" strokeWidth="1.3" />
              <path d="M198 520 C218 374 292 258 414 210" stroke={`url(#${id('edgeLight')})`} strokeWidth="3.4" strokeLinecap="round" opacity="0.95" filter={`url(#${id('glow')})`} />
              <path d="M760 902 C826 828 864 722 858 610" stroke="#D9A866" strokeOpacity="0.46" strokeWidth="2.2" strokeLinecap="round" />
            </g>
          </g>

          <g className="oiltea-leaf oiltea-leaf-bg">
            <path
              d="M690 300 C736 248 796 228 844 248 C884 264 906 298 892 330 C874 366 820 382 772 362 C734 346 704 322 690 300Z"
              fill="#8B7041"
              fillOpacity="0.06"
              stroke="#C6A36A"
              strokeOpacity="0.16"
              strokeWidth="1"
            />
          </g>

          <g className="oiltea-leaf oiltea-leaf-one">
            <path
              d="M186 400 C198 330 232 274 292 236 C342 204 400 190 452 204 C474 211 486 226 486 242 C486 260 470 286 442 310 C400 346 354 378 306 400 C250 426 204 422 186 400Z"
              fill="#000"
              opacity="0.28"
              filter={`url(#${id('leafBlur')})`}
              transform="translate(7 9)"
            />
            <path
              d="M186 400 C198 330 232 274 292 236 C342 204 400 190 452 204 C474 211 486 226 486 242 C486 260 470 286 442 310 C400 346 354 378 306 400 C250 426 204 422 186 400Z"
              fill={`url(#${id('leafA')})`}
              stroke="#E5B979"
              strokeOpacity="0.9"
              strokeWidth="1.6"
            />
            <path
              d="M186 400 C230 424 290 422 340 398 C390 372 430 340 462 298 L486 242 C470 268 446 292 416 314 C370 348 320 380 270 396 C235 408 205 406 186 400Z"
              fill="#2A1608"
              fillOpacity="0.2"
            />
            <path d="M486 242 C491 234 485 226 476 224" stroke="#B9925A" strokeOpacity="0.55" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M190 398 C258 366 324 330 388 290 C424 268 456 246 478 232" stroke="#FFE5B7" strokeOpacity="0.82" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M186 400 C166 416 152 438 148 462" stroke="#C6A36A" strokeOpacity="0.52" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M205 384 C230 334 270 296 314 268" stroke="#F4D49A" strokeOpacity="0.48" strokeWidth="0.85" strokeLinecap="round" />
            <path d="M286 350 C274 322 278 298 292 280" stroke="#E5B979" strokeOpacity="0.64" strokeWidth="0.9" />
            <path d="M334 320 C324 292 332 272 348 254" stroke="#E5B979" strokeOpacity="0.6" strokeWidth="0.9" />
            <path d="M380 290 C374 266 384 248 400 234" stroke="#E5B979" strokeOpacity="0.54" strokeWidth="0.8" />
            <path d="M278 370 C302 380 320 392 334 408" stroke="#B9925A" strokeOpacity="0.48" strokeWidth="0.8" />
            <path d="M340 340 C360 354 372 370 380 390" stroke="#B9925A" strokeOpacity="0.44" strokeWidth="0.75" />
            <path d="M402 306 C420 318 432 332 440 350" stroke="#B9925A" strokeOpacity="0.4" strokeWidth="0.7" />
          </g>

          <g className="oiltea-ring oiltea-ring-inner">
            <g transform="rotate(34 520 620)">
              <ellipse cx="520" cy="620" rx="266" ry="368" stroke="#C18A4D" strokeOpacity="0.11" strokeWidth="22" filter={`url(#${id('blurSoft')})`} />
              <ellipse cx="520" cy="620" rx="266" ry="368" stroke="#190E06" strokeOpacity="0.64" strokeWidth="13" transform="translate(4 6)" />
              <ellipse cx="520" cy="620" rx="266" ry="368" stroke="#4A2C17" strokeOpacity="0.5" strokeWidth="9" />
              <ellipse cx="520" cy="620" rx="266" ry="368" stroke={`url(#${id('metalInner')})`} strokeWidth="6.8" />
              <ellipse cx="520" cy="620" rx="261" ry="362" stroke="#FFF0CE" strokeOpacity="0.58" strokeWidth="1.2" />
              <path d="M308 560 C316 448 370 342 460 284" stroke="#F4D49A" strokeOpacity="0.76" strokeWidth="2.4" strokeLinecap="round" filter={`url(#${id('glow')})`} />
            </g>
          </g>

          <g className="oiltea-ghost-ring">
            <ellipse cx="530" cy="600" rx="182" ry="286" transform="rotate(72 530 600)" stroke="#C18A4D" strokeOpacity="0.16" strokeWidth="1.2" />
            <path d="M410 430 C468 360 548 328 622 350" stroke="#E5A64E" strokeOpacity="0.12" strokeWidth="1" />
          </g>

          <g className="oiltea-leaf oiltea-leaf-two">
            <path
              d="M646 962 C654 900 682 842 728 800 C772 758 830 736 878 748 C900 754 914 770 910 788 C906 812 880 838 846 864 C806 894 760 922 716 944 C690 956 664 966 646 962Z"
              fill="#000"
              opacity="0.2"
              filter={`url(#${id('leafBlur')})`}
              transform="translate(6 7)"
            />
            <path
              d="M646 962 C654 900 682 842 728 800 C772 758 830 736 878 748 C900 754 914 770 910 788 C906 812 880 838 846 864 C806 894 760 922 716 944 C690 956 664 966 646 962Z"
              fill={`url(#${id('leafB')})`}
              stroke="#D4B47D"
              strokeOpacity="0.66"
              strokeWidth="1.2"
            />
            <path d="M652 954 C712 920 774 878 834 824 C862 800 884 780 904 760" stroke="#F4D49A" strokeOpacity="0.56" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M646 962 C626 978 612 996 608 1018" stroke="#C6A36A" strokeOpacity="0.4" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M718 892 C724 860 738 836 760 816" stroke="#D9B27A" strokeOpacity="0.36" strokeWidth="0.7" />
            <path d="M770 846 C780 812 800 790 824 776" stroke="#D9B27A" strokeOpacity="0.32" strokeWidth="0.65" />
            <path d="M818 812 C832 784 850 766 874 754" stroke="#D9B27A" strokeOpacity="0.3" strokeWidth="0.6" />
          </g>

          <ellipse cx="520" cy="650" rx="238" ry="300" fill={`url(#${id('innerLight')})`} filter={`url(#${id('blurSoft')})`} className="oiltea-inner-light" />

          <g className="oiltea-flow-group">
            <path
              d="M130 1110 C220 1040 300 980 370 910 C446 836 496 770 528 690 C570 588 640 484 738 410 C800 362 860 330 912 302"
              stroke="#E5A64E"
              strokeOpacity="0.2"
              strokeWidth="28"
              strokeLinecap="round"
              filter={`url(#${id('blurSoft')})`}
            />
            <path
              d="M130 1110 C220 1040 300 980 370 910 C446 836 496 770 528 690 C570 588 640 484 738 410 C800 362 860 330 912 302"
              stroke="#2B1307"
              strokeOpacity="0.56"
              strokeWidth="6.4"
              strokeLinecap="round"
            />
            <path
              d="M130 1110 C220 1040 300 980 370 910 C446 836 496 770 528 690 C570 588 640 484 738 410 C800 362 860 330 912 302"
              stroke={`url(#${id('amber')})`}
              strokeWidth="3.4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M234 760 C340 900 506 960 654 900 C760 856 836 770 862 660"
              stroke="#C18A4D"
              strokeOpacity="0.38"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              className="oiltea-flow-trace"
              d="M130 1110 C220 1040 300 980 370 910 C446 836 496 770 528 690 C570 588 640 484 738 410 C800 362 860 330 912 302"
              stroke="#FFF4DC"
              strokeOpacity="0.92"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="86 1058.754"
            />
          </g>

          <g className="oiltea-lights">
            <circle cx="528" cy="690" r="5" fill="#F4D49A" opacity="0.8" filter={`url(#${id('glow')})`} />
            <circle cx="760" cy="398" r="3" fill="#E5A64E" opacity="0.65" filter={`url(#${id('glow')})`} />
          </g>
        </g>
      </svg>

      <div className="oiltea-vignette" />
      <figcaption className="oiltea-caption">
        <span>TRADITION, REIMAGINED BY INTELLIGENCE</span>
        <span aria-hidden="true">05 / HERITAGE TECH</span>
      </figcaption>
    </figure>
  )
}
