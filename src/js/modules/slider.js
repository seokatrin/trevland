export const activateSlider = () => {
  let index = 0;
  const container = document.querySelector(".item-offers");
  const totalItemsCount = container.children.length;
  //get scroll size which = distance between two elements
  const itemsLength1 = container.children[0].getBoundingClientRect().left;
  const itemsLength2 = container.children[1].getBoundingClientRect().left;
  const scroll = Math.round(itemsLength2 - itemsLength1);

  const buttons = document.querySelector(".offers__buttons");

  const onSlider = (btn) => {
    // get elements count in shown block
    const shownElementsCount = Math.round(
      document.querySelector(".offers__content").clientWidth / scroll
    );
    const maxIndex = totalItemsCount - shownElementsCount;
    if (btn === "next") {
      if (index === maxIndex) {
        index === maxIndex;
      } else {
        index++;
      }
    } else {
      if (index === 0) {
        index === 0;
      } else {
        index--;
      }
    }
    container.style.marginLeft = -(index * scroll) + "px";
  };

  buttons.addEventListener("click", function (e) {
    const target = e.target.closest(".offers__button");
    if (!target) return;
    this.children[0] === target ? onSlider("prev") : onSlider("next");
  });
};
