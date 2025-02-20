import { FC } from "react";

import { GREEN_APPOINTMENT_COLOR } from "~/styles/color.constants";
import { CustomSVGProps } from "./types";

export const AppointmentsIcon: FC<CustomSVGProps> = () => {
  return (
    <svg viewBox="0 0 41.15976 40.924495" height="100%" width="100%">
      <g transform="translate(-33.092865,-11.7318)" id="layer1">
        <g transform="translate(-92.673485,-143.80212)" id="g1037">
          <path
            transform="matrix(0.26458333,0,0,0.26458333,125.76635,153.13393)"
            d="m 28.367188,28.382812 v 0.002 h 27.550781 v -0.002 z m 27.550781,0.002 v 15.412109 c 0,7.631887 -6.143504,13.775391 -13.775391,13.775391 -7.631886,0 -13.775391,-6.143504 -13.77539,-13.775391 V 28.384766 H 18.183594 C 8.110359,28.384766 0,36.495126 0,46.568359 V 145.5625 c 0,10.07323 8.110359,18.18359 18.183594,18.18359 H 137.38086 c 10.07323,0 18.18359,-8.11036 18.18359,-18.18359 V 46.568359 c 0,-10.073233 -8.11036,-18.183593 -18.18359,-18.183593 h -11.73438 v 15.416015 c 0,7.631887 -6.1435,13.775391 -13.77539,13.775391 -7.63188,0 -13.775387,-6.143504 -13.775387,-13.775391 V 28.384766 Z m 19.753906,43.644531 c 0.305128,0.0039 0.608911,0.0149 0.912109,0.03516 2.425588,0.162066 4.773531,0.838384 6.865235,1.845703 8.366815,4.029355 14.473986,12.688606 14.646484,22.404297 0.106054,5.968967 -3.334993,11.004527 -7.470703,13.796877 -4.067565,2.74632 -8.745531,4.00346 -13.236328,4.79883 2.561272,2.35298 5.05972,5.15297 7.154297,8.48046 2.000582,3.17826 3.584587,4.46092 4.197265,4.89454 0.05368,-0.0783 0.08668,-0.13711 0.201172,-0.27344 1.439736,-1.71443 3.09375,-6.99805 3.09375,-6.99805 a 5.6049071,5.6049071 0 0 1 6.732422,-4.18555 5.6049071,5.6049071 0 0 1 4.185542,6.73243 c 0,0 -1.08025,6.47236 -5.433589,11.65625 -2.176667,2.59192 -6.464016,5.2631 -11.08789,4.17187 -4.623912,-1.09122 -7.947611,-4.58049 -11.375,-10.02539 -2.861859,-4.54643 -7.191107,-7.99964 -10.806641,-10.32031 0.05492,0.57354 -0.06346,1.4272 0.0059,1.96484 0.931956,7.22793 2.835938,10.72461 2.835938,10.72461 a 5.6049071,5.6049071 0 0 1 -2.347656,7.56641 5.6049071,5.6049071 0 0 1 -7.574219,-2.35352 c 0,0 -2.887716,-5.63697 -4.03125,-14.50586 -1.143534,-8.86889 -0.731577,-21.42654 5.072266,-36.267575 2.466519,-6.307011 6.25233,-10.804576 11.050781,-12.880859 2.099305,-0.908358 4.27426,-1.289213 6.410156,-1.261719 z m -0.326172,11.167969 c -0.570842,0.02541 -1.108063,0.155743 -1.632812,0.382812 -1.399333,0.60548 -3.325077,2.226156 -5.064453,6.673828 -2.061128,5.270551 -2.894629,9.809168 -3.609376,14.203128 2.828788,0.0641 5.253042,0.3508 10.208985,-0.50976 3.671282,-0.6375 7.11852,-1.78412 9.101562,-3.12305 1.983081,-1.338941 2.572095,-2.121185 2.533203,-4.310552 -0.07793,-4.388258 -4.29458,-10.579258 -8.291015,-12.503906 -1.248898,-0.601465 -2.29469,-0.854857 -3.246094,-0.8125 z"
            style={{
              fill: GREEN_APPOINTMENT_COLOR,
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 18.1417,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeOpacity: 1,
              paintOrder: "markers stroke fill",
            }}
            id="rect1010"
          />
          <rect
            transform="rotate(90)"
            ry="2.2049735"
            y="-157.56602"
            x="155.53392"
            height="4.4099469"
            width="11.358955"
            id="rect1012"
            style={{
              fill: GREEN_APPOINTMENT_COLOR,
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 4.79999,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeOpacity: 1,
              paintOrder: "markers stroke fill",
            }}
          />
          <rect
            transform="rotate(90)"
            style={{
              fill: GREEN_APPOINTMENT_COLOR,
              fillOpacity: 1,
              stroke: "none",
              strokeWidth: 4.79999,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 4,
              strokeDasharray: "none",
              strokeOpacity: 1,
              paintOrder: "markers stroke fill",
            }}
            id="rect1012-3"
            width="11.358955"
            height="4.4099469"
            x="155.60077"
            y="-139.09528"
            ry="2.2049735"
          />
        </g>
      </g>
    </svg>
  );
};
