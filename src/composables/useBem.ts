export const useBem = (blockName: string) => {
  const bem = (element?: string, modifier?: string) => {
    let className = blockName
    if (element) className += `__${element}`
    if (modifier) className += `--${modifier}`
    return className
  }

  return { bem }
}
