import styles from "./style.module.css";
const Card = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={styles.card} data-active={isActive}>
      <div className="flex justify-between">
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_9_1096)">
              <path
                d="M21.75 6.00002H3.57C3.35286 6.04205 3.12912 6.03553 2.91479 5.98095C2.70047 5.92636 2.50087 5.82506 2.33028 5.68429C2.1597 5.54352 2.02235 5.36677 1.92808 5.1667C1.83381 4.96663 1.78495 4.74819 1.785 4.52702V4.49852L21 3.75002V1.96502C21.0313 1.6987 21.0017 1.42874 20.9134 1.17553C20.8251 0.92232 20.6805 0.692481 20.4904 0.503369C20.3002 0.314258 20.0696 0.170817 19.8159 0.0838803C19.5623 -0.00305668 19.2922 -0.0312174 19.026 0.00152482L1.965 2.77502C1.3892 2.98758 0.892261 3.37131 0.540982 3.87463C0.189703 4.37795 0.00091746 4.97674 0 5.59052L0 21.7485C0 22.3453 0.237053 22.9176 0.65901 23.3395C1.08097 23.7615 1.65326 23.9985 2.25 23.9985H21.75C22.3467 23.9985 22.919 23.7615 23.341 23.3395C23.7629 22.9176 24 22.3453 24 21.7485V8.23352L24.0015 8.17202C24.0015 7.59518 23.7723 7.04196 23.3645 6.63407C22.9566 6.22618 22.4033 5.99702 21.8265 5.99702L21.747 5.99853L21.75 6.00002ZM19.5 16.5C18.9031 16.4998 18.3307 16.2625 17.9087 15.8403C17.4867 15.418 17.2498 14.8455 17.25 14.2485C17.2502 13.6516 17.4875 13.0792 17.9098 12.6572C18.332 12.2353 18.9046 11.9983 19.5015 11.9985C19.7971 11.9986 20.0897 12.0569 20.3628 12.1701C20.6358 12.2833 20.8839 12.4492 21.0928 12.6583C21.3017 12.8674 21.4674 13.1155 21.5805 13.3886C21.6935 13.6618 21.7516 13.9545 21.7515 14.25C21.7514 14.5456 21.6931 14.8383 21.5799 15.1113C21.4667 15.3843 21.3008 15.6324 21.0917 15.8413C20.8827 16.0503 20.6345 16.216 20.3614 16.329C20.0883 16.442 19.7956 16.5001 19.5 16.5Z"
                fill="#6FFC2D"
              />
            </g>
            <defs>
              <clipPath id="clip0_9_1096">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14 8.75C14.9665 8.75 15.75 7.9665 15.75 7C15.75 6.0335 14.9665 5.25 14 5.25C13.0335 5.25 12.25 6.0335 12.25 7C12.25 7.9665 13.0335 8.75 14 8.75Z"
            fill="white"
          />
          <path
            d="M14 15.75C14.9665 15.75 15.75 14.9665 15.75 14C15.75 13.0335 14.9665 12.25 14 12.25C13.0335 12.25 12.25 13.0335 12.25 14C12.25 14.9665 13.0335 15.75 14 15.75Z"
            fill="white"
          />
          <path
            d="M14 22.75C14.9665 22.75 15.75 21.9665 15.75 21C15.75 20.0335 14.9665 19.25 14 19.25C13.0335 19.25 12.25 20.0335 12.25 21C12.25 21.9665 13.0335 22.75 14 22.75Z"
            fill="white"
          />
        </svg>
      </div>
      <h3 className={styles.description} data-active={isActive}>
        Total Balance
      </h3>
      <h3 className={styles.amount} data-active={isActive}>
        $3140.74
      </h3>
    </div>
  );
};

export default Card;
