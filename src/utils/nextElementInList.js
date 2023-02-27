const nextElementInList = (list, currentItem) => {
  const currentIndex = list.indexOf(currentItem);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
};

export default nextElementInList;
