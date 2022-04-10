export const smartTagStyles = {
    components: {
        SmartTag: {
            variants: {
                "red":{
                    position: 'absolute !important',
                    color: '#fff',
                    textTransform: 'uppercase',
                    bg: '#d23f00',
                    lineHeight: '20px',
                    fontWeight: '700',
                    padding: '7px 30px',
                    minWidth: '200px',
                    textAlign: 'center',
                    top: '20px',
                    left: '-60px',
                    transform: 'rotate(-45deg)'
                },
                "green":{
                    position: 'absolute',
                    color: '#fff',
                    textTransform: 'uppercase',
                    bg: '#00d285',
                    lineHeight: '20px',
                    fontWeight: '700',
                    padding: '7px 30px',
                    minWidth: '200px',
                    textAlign: 'center',
                    top: '20px',
                    left: '-60px',
                    transform: 'rotate(-45deg)'
                }
            },
            baseStyle: {
                borderRadius: ".75rem",
                margin:"5px",
                _focus: {
                    boxShadow: "none",
                },
            },
        },
    },
  };
  