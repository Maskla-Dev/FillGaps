const getCookieValue = ( name: string ): string => {
    return document.cookie.match( '(^|;)\\s*' + name + '\\s*=\\s*([^;]+)' )?.pop() || ''
}

export default getCookieValue;