export type ReviewScreenshot = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  receivedDate: string;
  reportNo: string;
};

// 6 Instagram DM screenshots — unedited, spread across the last two months.
export const REVIEW_SCREENSHOTS: ReviewScreenshot[] = [
  {
    id: "review-01",
    image: "/images/reviews/review-01.jpg",
    width: 800,
    height: 1308,
    alt: "Instagram DM from a buyer thanking HustleHome for an accurate condition grade",
    receivedDate: "2026-08-30",
    reportNo: "HH-R-2041",
  },
  {
    id: "review-02",
    image: "/images/reviews/review-02.jpg",
    width: 832,
    height: 1232,
    alt: "Instagram DM from a buyer confirming a controller arrived as described",
    receivedDate: "2026-08-21",
    reportNo: "HH-R-2033",
  },
  {
    id: "review-03",
    image: "/images/reviews/review-03.jpg",
    width: 928,
    height: 1104,
    alt: "Instagram DM from a buyer asking a follow-up question about a wheel cap fitment",
    receivedDate: "2026-08-09",
    reportNo: "HH-R-2019",
  },
  {
    id: "review-04",
    image: "/images/reviews/review-04.jpg",
    width: 1072,
    height: 960,
    alt: "Instagram DM from a buyer sharing photos of their unit after delivery",
    receivedDate: "2026-07-28",
    reportNo: "HH-R-2008",
  },
  {
    id: "review-05",
    image: "/images/reviews/review-05.jpg",
    width: 768,
    height: 1328,
    alt: "Instagram DM thread with a buyer discussing a repeat purchase",
    receivedDate: "2026-07-14",
    reportNo: "HH-R-1994",
  },
  {
    id: "review-06",
    image: "/images/reviews/review-06.jpg",
    width: 784,
    height: 1328,
    alt: "Instagram DM from a buyer praising the grading report that came with their order",
    receivedDate: "2026-07-05",
    reportNo: "HH-R-1987",
  },
];
