function hanoiTower({
  numberOfDiscs,
  moveCallback = () => {},
  fromPole = [],
  withPole = [],
  toPole = [],
}) {
  for (let discSize = numberOfDiscs; discSize > 0; discSize--) {
    fromPole.push(discSize);
  }

  hanoiTowerRecursive({
    numberOfDiscs,
    fromPole,
    withPole,
    toPole,
    moveCallback,
  });
}

function hanoiTowerRecursive({
  numberOfDiscs,
  fromPole,
  withPole,
  toPole,
  moveCallback,
}) {
  if (numberOfDiscs === 1) {
    moveCallback(
      fromPole[fromPole.length - 1],
      fromPole.slice(),
      toPole.slice()
    );
    const disc = fromPole.pop();
    toPole.push(disc);
  } else {
    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole,
      withPole: toPole,
      toPole: withPole,
      moveCallback,
    });

    hanoiTowerRecursive({
      numberOfDiscs: 1,
      fromPole,
      withPole,
      toPole,
      moveCallback,
    });

    hanoiTowerRecursive({
      numberOfDiscs: numberOfDiscs - 1,
      fromPole: withPole,
      withPole: fromPole,
      toPole,
      moveCallback,
    });
  }
}
