const sidePositions = [ 'top', 'bottom', 'left', 'right' ];
const cornerPositions = [ 'top-left', 'top-right', 'bottom-left', 'bottom-right' ];
export const availablePositions = [ ...sidePositions, ...cornerPositions ];

function calculateIntersection (box, viewport) {
  if (box.x + box.width < viewport.left) {
    return 0;
  }
  if (box.x > viewport.left + viewport.width) {
    return 0;
  }
  if (box.y + box.height < viewport.top) {
    return 0;
  }
  if (box.y > viewport.top + viewport.height) {
    return 0;
  }

  const left = Math.max(box.x, viewport.left);
  const right = Math.min(box.x + box.width, viewport.left + viewport.width);
  const top = Math.max(box.y, viewport.top);
  const bottom = Math.min(box.y + box.height, viewport.top + viewport.height);

  return ((bottom - top) * (right - left)) / (box.width * box.height);
}

function checkOffsetPosition (targetBox, tooltipBox, viewport, coord, dim) {
  let c = targetBox[coord] + targetBox[dim] / 2 - tooltipBox[dim] / 2;
  let offset = 0;
  if (c < 0) {
    const newX = Math.min(viewport[coord], targetBox[coord]);
    offset = newX - c;
    c = newX;
  } else if (c + tooltipBox[dim] > viewport[dim]) {
    const newX = Math.max(viewport[coord] + viewport[dim], targetBox[coord] + targetBox[dim]) - tooltipBox[dim];
    offset = newX - c;
    c = newX;
  }

  return { coord: c, offset };
}

function checkPosition (position, distanceOffset, targetBox, tooltipBox, viewport, checkOffset = false) {
  const box = {
    width: tooltipBox.width,
    height: tooltipBox.height,
    offset: 0
  };

  if (position === 'top') {
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, box, viewport, 'left', 'width');
      box.x = coord;
      box.offset = offset;
    } else {
      box.x = targetBox.left + targetBox.width / 2 - box.width / 2;
    }
    box.y = targetBox.top - box.height - distanceOffset;
  } else if (position === 'bottom') {
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, box, viewport, 'left', 'width');
      box.x = coord;
      box.offset = offset;
    } else {
      box.x = targetBox.left + targetBox.width / 2 - box.width / 2;
    }
    box.y = targetBox.top + targetBox.height + distanceOffset;
  } else if (position === 'left') {
    box.x = targetBox.left - box.width - distanceOffset;
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, box, viewport, 'top', 'height');
      box.y = coord;
      box.offset = offset;
    } else {
      box.y = targetBox.top + targetBox.height / 2 - box.height / 2;
    }
  } else if (position === 'right') {
    box.x = targetBox.left + targetBox.width + distanceOffset;
    if (checkOffset) {
      const { coord, offset } = checkOffsetPosition(targetBox, box, viewport, 'top', 'height');
      box.y = coord;
      box.offset = offset;
    } else {
      box.y = targetBox.top + targetBox.height / 2 - box.height / 2;
    }
  } else if (position === 'top-left') {
    box.x = targetBox.left - box.width - distanceOffset;
    box.y = targetBox.top - box.height - distanceOffset;
  } else if (position === 'top-right') {
    box.x = targetBox.left + targetBox.width + distanceOffset;
    box.y = targetBox.top - box.height - distanceOffset;
  } else if (position === 'bottom-left') {
    box.x = targetBox.left - box.width - distanceOffset;
    box.y = targetBox.top + targetBox.height + distanceOffset;
  } else if (position === 'bottom-right') {
    box.x = targetBox.left + targetBox.width + distanceOffset;
    box.y = targetBox.top + targetBox.height + distanceOffset;
  }

  return {
    box,
    position,
    intersection: calculateIntersection(box, viewport)
  };
}

function transformBox (calculatedPosition, targetBox) {
  const { box, position } = calculatedPosition;

  return {
    position,
    box: {
      width: box.width,
      height: box.height,
      x: box.x - targetBox.left,
      y: box.y - targetBox.top,
      offset: box.offset
    }
  };
}

export default function calculatePosition (preferredPosition, currentPosition, distanceOffset, targetBox, tooltipBox, viewport) {
  const positions = [];

  let current = checkPosition(preferredPosition, distanceOffset, targetBox, tooltipBox, viewport);
  if (current.intersection > 0.99) {
    return transformBox(current, targetBox);
  }

  for (const pos of sidePositions) {
    current = checkPosition(pos, distanceOffset, targetBox, tooltipBox, viewport);
    positions.push(current);
    if (current.intersection > 0.99) {
      return transformBox(current, targetBox);
    }
  }

  for (const pos of sidePositions) {
    current = checkPosition(pos, distanceOffset, targetBox, tooltipBox, viewport, true);
    positions.push(current);
    if (current.intersection > 0.99) {
      return transformBox(current, targetBox);
    }
  }

  for (const pos of cornerPositions) {
    current = checkPosition(pos, distanceOffset, targetBox, tooltipBox, viewport);
    positions.push(current);
    if (current.intersection > 0.99) {
      return transformBox(current, targetBox);
    }
  }

  positions.sort((a, b) => b.intersection - a.intersection);

  return transformBox(positions[0], targetBox);
}
