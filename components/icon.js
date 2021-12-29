const withIcon = (icon) => {
  const Icon = ({
    size = 24,
    style = null,
    color = 'currentColor',
    viewBox = '0 0 24 24'
  }) => {
    return (
      <svg
        viewBox={viewBox}
        width={size}
        height={size}
        fill={color}
        dangerouslySetInnerHTML={{ __html: icon }}
        style={style}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    )
  }

  return Icon
}

export default withIcon
