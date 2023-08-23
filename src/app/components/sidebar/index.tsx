import useUserContext from "@/app/context/useUserContext";
import Link from "next/link";
import LinkIcon from "./links";
import styles from "./style.module.css";
import UserInfo from "./user-info";

const Sidebar = () => {
  const { user, setUser } = useUserContext();
  return (
    <div className={styles.sidebar}>
      <div className="flex items-center gap-3 p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="55"
          viewBox="0 0 52 55"
          fill="none"
        >
          <g clip-path="url(#clip0_9_1275)">
            <path
              d="M40.0693 17.3714C39.7254 17.0202 39.2428 16.8606 38.7706 16.9422C38.2975 17.0235 37.8889 17.3356 37.6694 17.7835C36.9146 19.3243 35.9558 20.7402 34.8278 21.9919C34.9403 21.0877 34.9968 20.1781 34.9968 19.2661C34.9968 17.5161 34.7736 15.7152 34.3332 13.9129C32.8851 7.99289 29.0877 2.98642 23.9151 0.177288C23.4648 -0.0672013 22.9282 -0.0586171 22.4852 0.200179C22.0421 0.459081 21.7519 0.933752 21.7122 1.4647C21.3089 6.84452 18.6717 11.739 14.4726 14.8962C14.417 14.9383 14.3619 14.9809 14.3067 15.0233C14.1924 15.1112 14.0847 15.1942 13.9841 15.264C13.9683 15.275 13.9527 15.2862 13.9374 15.2978C11.2965 17.2845 9.1174 19.9329 7.63548 22.9574C6.12965 26.0338 5.36615 29.3351 5.36615 32.7693C5.36615 34.5187 5.58935 36.3196 6.0296 38.1223C8.35289 47.6239 16.4906 54.2599 25.8191 54.2599C37.0962 54.2599 46.2708 44.6192 46.2708 32.7693C46.2708 26.9257 44.0684 21.4573 40.0693 17.3714Z"
              fill="#51C41B"
            />
            <ellipse
              cx="25.0386"
              cy="32.885"
              rx="6.25938"
              ry="6.577"
              fill="#F8F8F8"
            />
          </g>
          <defs>
            <clipPath id="clip0_9_1275">
              <rect width="51.6399" height="54.2603" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="101"
          height="47"
          viewBox="0 0 101 47"
          fill="none"
        >
          <path
            d="M9.87657 36.9683C11.4526 36.9683 12.8468 36.6658 14.0591 36.0607C15.2715 35.4238 16.1959 34.4684 16.8324 33.1945V36.3951H23.1972V10.3128H16.3778V25.5513C16.3778 27.0481 15.9534 28.2583 15.1048 29.1818C14.2562 30.0735 13.165 30.5194 11.8315 30.5194C10.4979 30.5194 9.40679 30.0735 8.55815 29.1818C7.70951 28.2583 7.28519 27.0481 7.28519 25.5513V10.3128H0.465759V26.1246C0.465759 29.3729 1.26894 32.0003 2.87529 34.0066C4.51195 35.9811 6.84571 36.9683 9.87657 36.9683Z"
            fill="white"
          />
          <path
            d="M28.1814 7.97205H35.0008V0.806573H28.1814V7.97205ZM28.1814 36.3951H35.0008V10.3128H28.1814V36.3951Z"
            fill="white"
          />
          <path
            d="M42.9916 36.3951H49.8111V16.5228H55.1302V10.3128H49.8111V9.93061C49.8111 7.60581 51.0992 6.44341 53.6754 6.44341C54.0997 6.44341 54.5998 6.49118 55.1757 6.58672V0.472186C54.4786 0.312954 53.6754 0.233337 52.7661 0.233337C49.6747 0.233337 47.2651 1.07727 45.5376 2.76514C43.8403 4.453 42.9916 6.84149 42.9916 9.93061V10.3128H38.8091V16.5228H42.9916V36.3951Z"
            fill="white"
          />
          <path
            d="M58.638 36.3951H65.4574V22.3508C65.4574 20.4081 65.9726 18.9113 67.0031 17.8604C68.0336 16.7776 69.3823 16.2362 71.0493 16.2362H73.1861V10.0261H71.7313C70.2158 10.0261 68.8671 10.3287 67.6851 10.9338C66.5333 11.507 65.6392 12.6057 65.0027 14.2299V10.3128H58.638V36.3951Z"
            fill="white"
          />
          <path
            d="M80.0392 47C84.5855 47 87.874 44.2771 89.9047 38.8313L100.543 10.3128H93.2235L87.3587 27.08L81.494 10.3128H74.1745L83.949 36.3951L83.4944 37.4938C83.1307 38.3536 82.6609 39.118 82.0851 39.7867C81.5092 40.4555 80.5545 40.7899 79.2209 40.7899C78.1298 40.7899 77.0993 40.6307 76.1294 40.3122V46.1879C76.6447 46.4745 77.2357 46.6815 77.9025 46.8089C78.5996 46.9363 79.3118 47 80.0392 47Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-10">
        <LinkIcon categoryName="Manage" title="Dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2.66667 24C1.93333 24 1.30533 23.7391 0.782667 23.2173C0.260889 22.6947 0 22.0667 0 21.3333V2.66667C0 1.93333 0.260889 1.30533 0.782667 0.782667C1.30533 0.260889 1.93333 0 2.66667 0H8C8.73333 0 9.36133 0.260889 9.884 0.782667C10.4058 1.30533 10.6667 1.93333 10.6667 2.66667V21.3333C10.6667 22.0667 10.4058 22.6947 9.884 23.2173C9.36133 23.7391 8.73333 24 8 24H2.66667ZM16 9.33333C15.2667 9.33333 14.6391 9.072 14.1173 8.54933C13.5947 8.02756 13.3333 7.4 13.3333 6.66667V2.66667C13.3333 1.93333 13.5947 1.30533 14.1173 0.782667C14.6391 0.260889 15.2667 0 16 0H21.3333C22.0667 0 22.6947 0.260889 23.2173 0.782667C23.7391 1.30533 24 1.93333 24 2.66667V6.66667C24 7.4 23.7391 8.02756 23.2173 8.54933C22.6947 9.072 22.0667 9.33333 21.3333 9.33333H16ZM16 24C15.2667 24 14.6391 23.7391 14.1173 23.2173C13.5947 22.6947 13.3333 22.0667 13.3333 21.3333V14.6667C13.3333 13.9333 13.5947 13.3053 14.1173 12.7827C14.6391 12.2609 15.2667 12 16 12H21.3333C22.0667 12 22.6947 12.2609 23.2173 12.7827C23.7391 13.3053 24 13.9333 24 14.6667V21.3333C24 22.0667 23.7391 22.6947 23.2173 23.2173C22.6947 23.7391 22.0667 24 21.3333 24H16Z"
              fill="#6FFC2D"
            />
          </svg>
        </LinkIcon>
        <div className="flex gap-5 ">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_9_1066)">
                <path
                  d="M12.184 0.00199265C11.546 -0.00800736 10.895 0.0239926 10.459 0.101993C8.601 0.423993 7.035 1.21199 5.739 2.47799C4.405 3.78099 3.581 5.29999 3.181 7.19299L3.042 7.83699L3.008 24C3.299 24.008 3.599 23.96 3.85 23.94C6.198 23.653 8.194 22.231 9.281 20.074C9.556 19.524 9.753 18.892 9.891 18.104C10.004 17.434 10.011 17.212 9.992 13.723L9.975 10.049L10.117 9.69199C10.314 9.20199 10.86 8.65699 11.349 8.45899L11.707 8.31699L15.053 8.31099C16.893 8.31099 18.507 8.28599 18.633 8.26199C19.218 8.14899 19.844 7.65899 20.095 7.11599C20.167 6.96599 20.263 6.67399 20.305 6.47699C20.37 6.14799 20.365 6.05799 20.269 5.68799C19.971 4.58799 18.919 3.06499 17.844 2.17399C16.624 1.16299 15.28 0.489993 13.828 0.147993C13.446 0.0619926 12.821 0.0109926 12.183 0.00199265H12.184ZM20.72 6.80199C20.67 6.98199 20.622 7.16899 20.548 7.32399C20.3763 7.68754 20.1222 8.00606 19.806 8.25429C19.4897 8.50251 19.1199 8.67361 18.726 8.75399C15.053 8.80999 16.187 8.80899 15.053 8.80999L11.805 8.81599L11.535 8.92299C11.222 9.04899 10.708 9.56299 10.582 9.87599L10.475 10.144L10.492 13.72C10.507 16.609 10.499 17.302 10.432 17.845C10.9496 17.9371 11.4743 17.9836 12 17.984C13.1808 17.984 14.3501 17.7514 15.4411 17.2995C16.532 16.8476 17.5233 16.1853 18.3583 15.3503C19.1933 14.5153 19.8556 13.524 20.3075 12.4331C20.7594 11.3421 20.992 10.1728 20.992 8.99199C20.9916 8.25359 20.9002 7.51806 20.72 6.80199Z"
                  fill="#808080"
                />
              </g>
              <defs>
                <clipPath id="clip0_9_1066">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Link href="/analytics" className="text-white">
            Analytics
          </Link>
        </div>
        <Link href="/setting/user">
          <UserInfo name={user.user?.firstName || ""} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
