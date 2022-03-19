import { useHistory } from 'react-router-dom';

function SidebarItemMultiple({ item, index: parentIndex, selectedItem, setSelectedItem }) {
    const history = useHistory();

    return (
        <div className={`menu-item ${parentIndex === selectedItem && 'selected'}`}>
            <div className={`select ${parentIndex !== selectedItem && 'not-visible'}`} />
            {item.icon}
            <div className='options'>
                {item.options.map((option, index) => {
                    return (
                    <p key={index} className='item-tooltip-options' onClick={ option.link ? () => {setSelectedItem(parentIndex); history.push(option.link)} : option.onClick }>
                        {option.name}
                    </p>
                    )
                })}
            </div>
        </div>
    );
}

export default SidebarItemMultiple;