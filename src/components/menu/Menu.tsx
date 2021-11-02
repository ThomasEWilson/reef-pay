import "./menu.scss"

export default function Menu({ menuOpen, setMenuOpen }) {
    
    
        
        const sideBarMenuLis = [  
            {
                className: 'sideBarMenuLis',
                href: '#intro',
                text: 'Home'
            },
            {
                className: 'sideBarMenuLis',
                href: '#portfolio',
                text: 'Portfolio'
            },
            {
                className: 'sideBarMenuLis',
                href: '#works',
                text: 'Works'
            },
            {
                className: 'sideBarMenuLis',
                href: '#testimonials',
                text: 'Testimonials'
            },
            {
                className: 'sideBarMenuLis',
                href: '#contact',
                text: 'Contact'
            }]

    return (
        <div className={"menu " +(menuOpen && "active")}>
            <ul>
                {
                    sideBarMenuLis.map( (li) => {
                    
                        return ( 
                        <li className={li.className} onClick={()=>setMenuOpen(false)}>
                            <a href={li.href}>
                                    {li.text}
                            </a>
                        </li> 
                        );
                    }) 

                }
               
            </ul>
            
        </div>
    )
}
