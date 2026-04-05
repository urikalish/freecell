import { Suit, Rank, FOUNDATION_SUIT_ORDER } from '../model/types';

export { FOUNDATION_SUIT_ORDER };

export function suitSvg(suit: Suit, rank: Rank, showFigure: boolean): string {
  if (showFigure && rank === 11) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
    <path d="M 52.925 44.314 c -1.02 -0.675 -2.445 -1.022 -3.688 -1.342 c 1.47 -0.324 2.856 -0.657 4.437 -0.492 C 55.455 42.78 54.457 45.223 52.925 44.314 L 52.925 44.314 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 36.116 39.617 c 0 1.734 -0.917 3.51 -2.1 5.273 c 2.585 1.681 4.487 3.701 4.997 6.413 c -3.882 -4.261 -7.611 -2.806 -8.915 -0.869 l 0 -0.001 c -1.402 1.851 -1.442 7.474 2.822 8.972 c 9.875 3.469 13.159 -8.886 12.789 -19.787 H 36.116 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 47.385 37.76 l 9.01 0 c 0.412 -2.326 1.923 -5.523 3.798 -7.76 H 31.187 c 2.345 2.323 4.266 5.558 4.884 7.76 l 9.581 0 H 47.385 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 60.75 46.855 c -2.174 -2.222 -3.55 -4.622 -3.959 -7.238 h -1.894 c 0.44 2.38 1.717 4.574 3.708 6.608 c -0.612 1.544 -2.011 2.294 -4.131 2.319 c -1.591 4.99 3.58 7 -1.56 8.765 c -3.396 0.937 -6.294 0.786 -8.803 -0.216 c -0.086 0.135 -0.165 0.278 -0.255 0.409 c 2.994 1.742 6.569 2.21 10.907 1.013 c 5.408 -1.856 -0.032 -3.971 1.642 -9.221 C 58.634 49.268 60.107 48.479 60.75 46.855 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    </g>
    </svg>`;
  }
  if (showFigure && rank === 12) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
    <path d="M 52.925 47.449 c -1.02 -0.675 -2.445 -1.022 -3.688 -1.342 c 1.47 -0.324 2.856 -0.657 4.437 -0.492 C 55.455 45.915 54.457 48.358 52.925 47.449 L 52.925 47.449 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 36.116 42.752 c 0 0.193 -0.011 0.386 -0.033 0.579 c -0.323 2.872 0.104 5.802 1.72 8.198 c 0.591 0.876 1.009 1.839 1.21 2.909 c -3.882 -4.261 -7.611 -2.806 -8.915 -0.869 l 0 -0.001 c -1.402 1.851 -1.442 7.474 2.822 8.972 c 9.875 3.469 13.159 -8.886 12.789 -19.787 H 36.116 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 60.75 49.695 c -2.174 -2.132 -3.55 -4.434 -3.959 -6.943 h -1.894 c 0.44 2.283 1.717 4.388 3.708 6.34 c -0.612 1.481 -2.011 2.201 -4.131 2.225 c -1.591 4.787 2.312 6.39 -2.828 8.083 c -3.396 0.899 -5.026 1.08 -7.535 0.119 c -0.086 0.13 -0.165 0.266 -0.255 0.392 c 2.994 1.671 5.301 1.794 9.639 0.645 c 5.408 -1.781 1.236 -3.484 2.91 -8.52 C 58.634 52.011 60.107 51.254 60.75 49.695 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    <path d="M 58.943 29.745 c 0 -1.764 -1.585 -3.157 -3.409 -2.833 c -1.157 0.206 -2.103 1.157 -2.306 2.314 c -0.271 1.55 0.7 2.909 2.077 3.286 c -5.302 3.256 -12.314 4.693 -20.666 4.703 l 1.476 3.537 l 20.675 0 c 1.633 -3.335 2.196 -7.047 2.149 -10.974 C 58.94 29.766 58.943 29.756 58.943 29.745 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
    </g>
    </svg>`;
  }
  if (showFigure && rank === 13) {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
  <path d="M 52.552 44.994 c -0.972 -0.643 -2.33 -0.974 -3.515 -1.278 c 1.401 -0.309 2.721 -0.626 4.228 -0.469 C 54.963 43.533 54.012 45.86 52.552 44.994 L 52.552 44.994 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
  <path d="M 36.534 40.518 c 0 1.652 -0.874 3.345 -2.001 5.025 c 2.463 1.602 4.276 3.527 4.762 6.111 c -3.699 -4.061 -7.253 -2.674 -8.495 -0.828 l 0 -0.001 c -1.336 1.764 -1.374 7.122 2.689 8.549 c 9.411 3.306 12.539 -8.468 12.187 -18.856 H 36.534 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
  <polygon points="52.89,32.49 50.93,28.5 46.36,32.17 41.8,28.5 39.9,32.49 33.07,29.55 36.68,38.75 46.33,38.75 46.39,38.75 56.05,38.75 59.66,29.55 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
  <path d="M 55.552 51.763 c -0.005 -0.616 0.081 -1.287 0.316 -2.024 c 2.124 -0.025 3.528 -0.777 4.141 -2.325 c -2.072 -2.118 -3.382 -4.405 -3.773 -6.897 h -1.804 c 0.419 2.268 1.637 4.358 3.533 6.297 c -0.583 1.471 -1.917 2.186 -3.936 2.21 l -3.703 0.228 l -0.653 3.545 l -2.986 -2.128 c -0.53 2.237 -1.302 4.25 -2.357 5.823 c 3.287 5.413 10.336 6.675 14.722 2.611 c 0.816 -0.756 0.858 -2.045 0.126 -2.883 C 57.7 54.531 56.473 53.07 55.552 51.763 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: currentColor; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
</g>
</svg>`;
  }
  if (suit === Suit.Spades) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path d="m271.45 410.63c0 10.357-16.019 17.3-16.188 25.781 0 4.653 3.6576 8.4242 8.1681 8.4242 3.3919 0 6.2997-2.1329 7.5339-5.1695-1.9944 8.7938-9.7438 8.7061-9.7438 8.7061h20.417s-7.7123-0.0486-9.7296-8.6951c1.2368 3.0307 4.1426 5.1584 7.5303 5.1584 4.5106 0 8.1663-3.7712 8.1663-8.4242 0.01-8.8183-16.154-15.425-16.154-25.781z" style="stroke-linejoin:round;stroke:currentColor;stroke-linecap:round;stroke-width:0.0338;fill:currentColor" transform="translate(-146.2200,-238.3586) scale(0.582906)" />
</svg>`;
  }
  if (suit === Suit.Hearts) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="m375.26 419.93c0-5.1337 3.6572-9.2945 8.1674-9.2945 3.9514 0 7.247 3.1941 8.003 7.4381 0.756-4.2437 4.0516-7.4381 8.003-7.4381 4.5102 0 8.1656 4.1608 8.1656 9.2945 0.01 9.7294-16.153 17.018-16.153 28.444 0-11.427-16.017-19.087-16.186-28.444z" style="stroke-linejoin:round;stroke:currentColor;stroke-linecap:round;stroke-width:0.0356;fill:currentColor" transform="translate(-216.1874,-238.3837) scale(0.582959)" />
</svg>`;
  }
  if (suit === Suit.Clubs) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="m351.32 410.63c-4.5104 0-8.1679 3.8757-8.1679 8.6553 0 3.5526 2.0215 6.6049 4.9111 7.9378 1.2068 1.2709 2.2688 3.0657 2.8709 5.5998-1.2517-3.0772-4.1401-5.2307-7.5033-5.2307-4.5104 0-8.1679 3.8757-8.1679 8.6553s3.6575 8.6534 8.1679 8.6534c3.3728 0 6.2682-2.1659 7.5141-5.2572-2.0691 8.816-9.6954 8.7273-9.6954 8.7273h20.416s-7.3995-0.0484-9.5989-8.396c1.3144 2.9133 4.1205 4.9259 7.3711 4.9259 4.5105 0 8.1662-3.8738 8.1662-8.6534s-3.6557-8.6553-8.1662-8.6553c-3.2373 0-6.0338 1.9959-7.355 4.8899 0.7033-2.6318 1.9236-4.4349 3.2639-5.668 0.0007-0.00061 0-0.001 0-0.002 2.4705-1.4878 4.1376-4.3002 4.1376-7.527 0-4.7796-3.6557-8.6553-8.1662-8.6553z" style="stroke-linejoin:round;stroke:currentColor;stroke-linecap:round;stroke-width:0.0343;fill:currentColor" transform="translate(-192.8564,-238.3630) scale(0.582917)" />
</svg>`;
  }
  if (suit === Suit.Diamonds) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="m311.43 448.37s-4.6103-7.1709-7.3173-10.33c-2.707-3.159-8.8518-8.5392-8.8518-8.5392s6.1448-5.3802 8.8518-8.5392 7.3173-10.33 7.3173-10.33 4.6103 7.1709 7.3173 10.33c2.7069 3.159 8.8518 8.5392 8.8518 8.5392s-6.1449 5.3802-8.8518 8.5392c-2.707 3.159-7.3173 10.33-7.3173 10.33z" style="stroke-linejoin:round;stroke:currentColor;stroke-linecap:round;stroke-width:0.0361;fill:currentColor" transform="translate(-169.5514,-238.3820) scale(0.582961)" />
</svg>`;
  }
  return '';
}
