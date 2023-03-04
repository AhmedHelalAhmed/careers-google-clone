const nextElementInList = <T>(list: T[], currentItem: T) => {
  const currentIndex = list.indexOf(currentItem);
  const nextIndex = (currentIndex + 1) % list.length;
  return list[nextIndex];
};

export default nextElementInList;
