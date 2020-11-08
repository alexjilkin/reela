export function isClipsCollide(clip1, clip2) {
    clip1.centerX = clip1.x + clip1.width / 2;
    clip1.centerY = clip1.y + clip1.height / 2;
    clip2.centerX = clip2.x + clip2.width / 2;
    clip2.centerY = clip2.y + clip2.height / 2;

    clip1.halfWidth = clip1.width / 2;
    clip1.halfHeight = clip1.height / 2;
    clip2.halfWidth = clip2.width / 2;
    clip2.halfHeight = clip2.height / 2;
  
    return (Math.abs(clip1.centerX - clip2.centerX) < clip1.halfWidth + clip2.halfWidth
    && Math.abs(clip1.centerY - clip2.centerY) < clip1.halfHeight + clip2.halfHeight) 
  }
