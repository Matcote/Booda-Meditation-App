import moment from "moment";
import { profile } from "./Profile";
const findMinutes = (daysAgoStart, daysAgoLimit) => {
  let minutes = 0;
  if (profile !== undefined) {
    profile.posts
      .filter((post) => {
        return (
          daysAgoLimit > (new Date() - new Date(post.date)) / 86400000 &&
          (new Date() - new Date(post.date)) / 86400000 > daysAgoStart
        );
      })
      .forEach((post) => (minutes = minutes + post.time / 60));
  }
  return minutes;
};
export const weekData = {
  labels: [
    moment().subtract(6, "days").format("MMM Do"),
    moment().subtract(5, "days").format("MMM Do"),
    moment().subtract(4, "days").format("MMM Do"),
    moment().subtract(3, "days").format("MMM Do"),
    moment().subtract(2, "days").format("MMM Do"),
    moment().subtract(1, "days").format("MMM Do"),
    moment().format("MMM Do"),
  ],
  datasets: [
    {
      label: "Mindful Minutes",
      data: [
        findMinutes(6, 7),
        findMinutes(5, 6),
        findMinutes(4, 5),
        findMinutes(3, 4),
        findMinutes(2, 3),
        findMinutes(1, 2),
        findMinutes(0, 1),
      ],
      backgroundColor: "#d9d4e777",
      borderColor: "#a786df",
      borderWidth: 1,
      fill: "start",
    },
  ],
};
export const monthData = {
  labels: [
    moment().subtract(25, "days").format("MMM Do"),
    moment().subtract(20, "days").format("MMM Do"),
    moment().subtract(15, "days").format("MMM Do"),
    moment().subtract(10, "days").format("MMM Do"),
    moment().subtract(5, "days").format("MMM Do"),
    moment().format("MMM Do"),
  ],
  datasets: [
    {
      label: "Mindful Minutes",
      data: [
        findMinutes(25, 30),
        findMinutes(20, 25),
        findMinutes(15, 20),
        findMinutes(10, 15),
        findMinutes(5, 10),
        findMinutes(0, 5),
      ],
      backgroundColor: "#d9d4e777",
      borderColor: "#a786df",
      borderWidth: 1,
      fill: "start",
    },
  ],
};
export const yearData = {
  labels: [
    moment().subtract(305, "days").format("MMM YY"),
    moment().subtract(244, "days").format("MMM YY"),
    moment().subtract(183, "days").format("MMM YY"),
    moment().subtract(122, "days").format("MMM YY"),
    moment().subtract(61, "days").format("MMM YY"),
    moment().format("MMM YY"),
  ],
  datasets: [
    {
      label: "Mindful Minutes",
      data: [
        findMinutes(305, 365),
        findMinutes(244, 305),
        findMinutes(183, 244),
        findMinutes(122, 183),
        findMinutes(61, 122),
        findMinutes(0, 61),
      ],
      backgroundColor: "#d9d4e777",
      borderColor: "#a786df",
      borderWidth: 1,
      fill: "start",
    },
  ],
};
