const withIcon = (icon) => {
  const Icon = ({ size = 24, style = null, color = 'currentColor' }) => {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={color}
        dangerouslySetInnerHTML={{ __html: icon }}
        style={style}
      />
    )
  }

  return Icon
}

export default withIcon
