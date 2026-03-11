import { useMatch } from 'react-router-dom'

// стили
import style from './arrows.module.css'
import arrow_back from '@assets/icons/arrows/arrow-back.png'
import arrow_next from '@assets/icons/arrows/arrow-next.png'


// // const
import { Path_of_Routes } from '@utils/routes'

// // components
import Button from '@components/UI/Button/Button'
import { useArrowNavigation } from '@hooks/routing/useArrowNavigation'

const Arrows = () => {
  const match = useMatch(Path_of_Routes.hymn(':id'));
  const { goPrev, goNext, hasPrev, hasNext } = useArrowNavigation();

  console.log(match)
  console.log(true)
  if (!match) return null;

  return (
    <div className={style.arrows}>
      <Button variant='control' onClick={goPrev} disabled={!hasPrev}>
        <img src={arrow_back} alt="back" />
      </Button>

      <Button variant='control' onClick={goNext} disabled={!hasNext}>
        <img src={arrow_next} alt="next" />
      </Button>
    </div>
  );
};

export default Arrows