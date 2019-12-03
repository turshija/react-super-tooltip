const availablePositions = [ 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right' ];
const offsetablePositions = [ 'top', 'bottom', 'left', 'right' ];

function calculateIntersection (box, viewport) {
  if (box.x + box.width < viewport.x) {
    return 0;
  }
  if (box.x > viewport.x + viewport.width) {
    return 0;
  }
  if (box.y + box.height < viewport.y) {
    return 0;
  }
  if (box.y > viewport.y + viewport.height) {
    return 0;
  }

  const left = Math.max(box.x, viewport.x);
  const right = Math.min(box.x + box.width, viewport.x + viewport.width);
  const top = Math.max(box.y, viewport.y);
  const bottom = Math.min(box.y + box.height, viewport.y + viewport.height);

  return ((bottom - top) * (right - left)) / (box.width * box.height);
}

function checkOffsetPosition (targetBox, tooltipBox, viewport, coord, dim) {
  let c = targetBox[coord] + targetBox[dim] / 2 - tooltipBox[dim] / 2;
  let offset = 0;
  if (c < viewport[coord]) {
    const newX = Math.min(viewport[coord], targetBox[coord]);
    offset = newX - c;
    c = newX;
  } else if (c + tooltipBox[dim] > viewport[coord] + viewport[dim]) {
    const newX = Math.max(viewport[coord] + viewport[dim], targetBox[coord] + targetBox[dim]) - tooltipBox[dim];
    offset = newX - c;
    c = newX;
  }

  return { coord: c, offset };
}

function checkPosition (position, targetBox, tooltipBox, viewport, checkOffset = false) {
  const box = {
    width: tooltipBox.width,
    height: tooltipBox.height,
    offset: 0
  };

  if (position === 'top') {
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, tooltipBox, viewport, 'x', 'width');
      box.x = coord;
      box.offset = offset;
    } else {
      box.x = targetBox.x + targetBox.width / 2 - tooltipBox.width / 2;
    }
    box.y = targetBox.y - tooltipBox.height;
  } else if (position === 'bottom') {
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, tooltipBox, viewport, 'x', 'width');
      box.x = coord;
      box.offset = offset;
    } else {
      box.x = targetBox.x + targetBox.width / 2 - tooltipBox.width / 2;
    }
    box.y = targetBox.y + targetBox.height;
  } else if (position === 'left') {
    box.x = targetBox.x - tooltipBox.width;
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, tooltipBox, viewport, 'y', 'height');
      box.y = coord;
      box.offset = offset;
    } else {
      box.y = targetBox.y + targetBox.height / 2 - tooltipBox.height / 2;
    }
  } else if (position === 'right') {
    box.x = targetBox.x + targetBox.width;
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, tooltipBox, viewport, 'y', 'height');
      box.y = coord;
      box.offset = offset;
    } else {
      box.y = targetBox.y + targetBox.height / 2 - tooltipBox.height / 2;
    }
  } else if (position === 'top-left') {
    box.x = targetBox.x - tooltipBox.width;
    box.y = targetBox.y - tooltipBox.height;
  } else if (position === 'top-right') {
    box.x = targetBox.x + targetBox.width;
    box.y = targetBox.y - tooltipBox.width;
  } else if (position === 'bottom-left') {
    box.x = targetBox.x - tooltipBox.width;
    box.y = targetBox.y + targetBox.height;
  } else if (position === 'bottom-right') {
    box.x = targetBox.x + targetBox.width;
    box.y = targetBox.y + targetBox.height;
  }

  return {
    box,
    position,
    intersection: calculateIntersection(box, viewport)
  };
}

export default function calculatePosition (preferredPosition, currentPosition, targetBox, tooltipBox, viewport) {
  const positions = [];

  let current = checkPosition(preferredPosition, targetBox, tooltipBox, viewport);
  positions.push(current);
  if (current.intersection > 0.99) {
    return current;
  }

  for (const pos of availablePositions) {
    current = checkPosition(pos, targetBox, tooltipBox, viewport);
    positions.push(current);
    if (current.intersection > 0.99) {
      return current;
    }
  }

  for (const pos of offsetablePositions) {
    current = checkPosition(pos, targetBox, tooltipBox, viewport, true);
    positions.push(current);
    if (current.intersection > 0.99) {
      return current;
    }
  }

  positions.sort((a, b) => b.intersection - a.intersection);

  console.log(positions);

  return positions[0];
}
