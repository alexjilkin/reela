export function isClipsCollide(clip1, clip2) {
  const clip1Bounds = clip1.getBounds()
  const clip2Bounds = clip2.getBounds()

  clip1.centerX = clip1Bounds.x + clip1Bounds.width / 2;
  clip1.centerY = clip1Bounds.y + clip1Bounds.height / 2;
  clip2.centerX = clip2Bounds.x + clip2Bounds.width / 2;
  clip2.centerY = clip2Bounds.y + clip2Bounds.height / 2;

  clip1.halfWidth = clip1Bounds.width / 2;
  clip1.halfHeight = clip1Bounds.height / 2;
  clip2.halfWidth = clip2Bounds.width / 2;
  clip2.halfHeight = clip2Bounds.height / 2;

  return (Math.abs(clip1.centerX - clip2.centerX) < clip1.halfWidth + clip2.halfWidth
  && Math.abs(clip1.centerY - clip2.centerY) < clip1.halfHeight + clip2.halfHeight) 
  }
