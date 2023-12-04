let data = {};
const SELECTOR1 = "#text";
const SELECTOR2 = "#author";

const colors = [
  "#e6a7b3",
  "#e68b9d",
  "#e6b386",
  "#e6b200",
  "#e6b39f",
  "#93adcc",
  "#97b7c5",
  "#7ae182",
  "#e68c5a",
  "#cc6666",
  "#e6d1c4",
  "#e698cc",
  "#e6b494",
  "#75b5d4",
  "#e65392",
  "#cca75a",
  "#e6cfcc",
  "#a8b6b6",
  "#d5d5ad",
  "#e69a9f",
];

const apiCall = () => {
  const limit = 100;
  $.ajax({
    method: "GET",
    url: "https://api.quotable.io/quotes?limit=" + limit,
    success: (result) => {
      data = result;
      changeText(data, SELECTOR1, SELECTOR2);
    },
    error: (ajaxError = (e) => {
      console.error("Error: ", e.responseText);
    }),
  });
};
apiCall();

const changeText = (data, selector1, selector2) => {
  let random = Math.floor(Math.random() * 99);

  $("#quote-box").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $(selector1).text(data.results[random].content);
    $(selector2).text("- " + data.results[random].author);
  });

  let color = Math.floor(Math.random() * colors.length);
  $("body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color],
    },
    1000
  );

  $("button").animate(
    {
      backgroundColor: colors[color],
      borderColor: colors[color],
      color: "white",
    },
    1000
  );

  $("i").animate(
    {
      borderColor: colors[color],
      backgroundColor: colors[color],
    },
    1000
  );

  $(selector1).animate(
    {
      color: colors[color],
    },
    1000
  );

  $(selector2).animate(
    {
      color: colors[color],
    },
    1000
  );
};

const nextQuote = () => {
  changeText(data, SELECTOR1, SELECTOR2);
};

const tweetThis = (text, author) => {
  text = $(SELECTOR1).text();
  author = $(SELECTOR2).text();
  $("#tweet-quote").attr(
    "href",
    "https://twitter.com/intent/tweet?text=" +
      text +
      "  " +
      author +
      "&hashtags=quotes"
  );
};
