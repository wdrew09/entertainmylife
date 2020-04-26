import React, { useState, useEffect } from 'react';

import styles from './Disclaimer.module.css';

const Disclaimer = props => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }, [])

    return (
        <div className={styles.Main}>
            <span className={styles.Title}>Disclaimer</span>
            <span className={styles.Content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis malesuada erat, at cursus arcu. In fringilla faucibus metus, id ornare felis interdum sit amet. Maecenas maximus accumsan scelerisque. Cras vitae justo rhoncus, ullamcorper turpis eu, viverra leo. Phasellus vel justo ipsum. Sed at auctor augue, sit amet ultrices libero. Suspendisse ac laoreet metus. Proin eu varius velit. Maecenas malesuada vehicula ornare. Sed eros lorem, molestie in accumsan vel, commodo id odio. Phasellus egestas sodales magna cursus porta. Vestibulum vel auctor magna. Fusce tristique sapien eu risus porta, at porttitor est vehicula. In hac habitasse platea dictumst.

            Sed nec laoreet erat, rhoncus bibendum ipsum. Proin auctor ligula dolor. Praesent quis tellus nisi. Phasellus ullamcorper justo vel ligula feugiat sollicitudin. Nullam vitae nisl nec erat euismod dignissim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer sed imperdiet justo. Etiam vel porta neque, in ultricies ante. Vestibulum cursus, diam eget rutrum tincidunt, eros arcu vehicula ante, in feugiat ligula est at justo. Vestibulum eleifend metus vitae pharetra suscipit. Nam consequat purus sit amet orci viverra, vel maximus tortor sollicitudin. Pellentesque laoreet molestie odio. Morbi malesuada nisl ligula, eu convallis enim commodo vitae. Donec in lectus id augue cursus porttitor. Nulla fermentum enim eget enim tempus suscipit. Nunc ac iaculis ipsum.

            Proin mattis erat vitae eleifend luctus. Nam massa eros, scelerisque in congue et, accumsan ac metus. Aliquam fringilla ante tortor. Curabitur consectetur ex id bibendum congue. In lorem nulla, mollis ac velit ut, luctus varius velit. Sed semper et libero a viverra. Ut vitae risus est. Aliquam venenatis justo bibendum mollis dictum.

            Aenean bibendum molestie elementum. Vivamus eleifend consequat velit in aliquam. Cras placerat vehicula ex, nec varius erat mollis vel. Pellentesque eget magna vel ipsum fringilla placerat id at est. Pellentesque tempus nunc sit amet nibh egestas, vel ultrices mauris vehicula. Donec laoreet condimentum turpis eget interdum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec lectus lorem, condimentum quis malesuada eu, rutrum sed magna. Donec quis orci sed massa fermentum blandit.
            </span>
        </div>
    )
}

export default Disclaimer