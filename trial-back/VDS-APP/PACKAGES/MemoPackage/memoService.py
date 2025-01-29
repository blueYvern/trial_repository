from .memoModel import Memo,db,logger
from datetime import datetime

class MemoService:
    
    last_reopen_date = None

    @staticmethod
    def getAllMemos():
        logger.debug('getAllMemos called')
        logger.debug('Checkign to reopen completed memos')
        MemoService.reopenCompletedMemos()
        logger.debug('Returning memos')
        return Memo.query.all()
    
    @staticmethod
    def getAllMemosCount():
        logger.debug('getAllMemosCount called')
        memos = MemoService.getAllMemos()
        open_count = 0
        completed_count = 0
        for memo in memos:
            if memo.status == "open":
                open_count += 1
            else:
                completed_count += 1

        logger.debug('Returning memos count')
        return {'open_count':open_count,
                'completed_count':completed_count}

    @staticmethod
    def createMemo(memo):
        logger.debug('createMemo called')
        new_memo = Memo(
            title=memo["title"],
            created_date=memo["created_date"],
            target_date=memo["target_date"],
            status="open",
            persistence=memo["persistence"],
            completed_date=None)
        logger.debug('Checking if memo already exists')
        if MemoService.check_existing_by_title(new_memo.title,new_memo.persistence) != 0:
            return False
        else:
            logger.debug('Adding memo to database')
            db.session.add(new_memo)
            db.session.commit()
            return True
        
    @staticmethod
    def check_existing_id(id):
        memo = Memo.query.filter_by(id=id).first()
        if memo:
            logger.debug('Memo already exists')
            return True
        else:
            logger.debug('Memo does not exist')
            return False

    def check_existing_by_title(title,persistence):
        memo = Memo.query.filter_by(title=title,persistence=persistence).first()
        if memo:
            logger.debug('Memo found in database')
            return memo.id
        else:
            logger.debug('Memo does not exist')
            return 0

    @staticmethod
    def deleteMemo(id):
        logger.debug('deleteMemo called')
        if MemoService.check_existing_id(id):
            logger.debug('Deleting memo {id} from database')
            memo = Memo.query.filter_by(id=id).first()
            db.session.delete(memo)
            db.session.commit()
            return True
        else:
            logger.debug('Memo: {id} not found in database')
            return False

    @staticmethod
    def updateMemo(memo):
        logger.debug('updateMemo called')
        if MemoService.check_existing_id(memo["id"]) and (MemoService.check_existing_by_title(memo["title"],memo["persistence"]) == memo["id"] or MemoService.check_existing_by_title(memo["title"],memo["persistence"]) == 0):
            logger.debug(f'Updating memo {memo["id"]} in database')
            memo_to_update = Memo.query.filter_by(id=memo["id"]).first()
            memo_to_update.title = memo["title"]
            memo_to_update.created_date = memo["created_date"]
            memo_to_update.target_date = memo["target_date"]
            memo_to_update.status = memo["status"]
            memo_to_update.persistence = memo["persistence"]
            memo_to_update.completed_date = memo["completed_date"]
            db.session.commit()
            return True
        else:
            logger.debug(f'Memo: {memo["id"]} not found in database')
            return False
        
    @staticmethod
    def updateMemoAction(memo):
        logger.debug('updateMemoAction called')
        if MemoService.check_existing_id(memo["id"]):
            logger.debug(f'Updating memo {memo["id"]} in database')
            memo_to_update = Memo.query.filter_by(id=memo["id"]).first()
            memo_to_update.completed_date = memo["completed_date"]
            memo_to_update.status = memo["status"]
            db.session.commit()
            return True
        else:
            logger.debug(f'Memo: {memo["id"]} not found in database')
            return False

    @staticmethod
    def reopenCompletedMemos():
        logger.debug('reopenCompletedMemos called')
        today = datetime.now().date()
        
        logger.debug('Checking if it is the last reopen date')
        if MemoService.last_reopen_date == today:
            logger.debug('It is the last reopen date')
            return 

        logger.debug('It is not the last reopen date, setting last reopen date to today')
        MemoService.last_reopen_date == today
        
        logger.debug('Fetching completed memos')
        completed_memos = Memo.query.filter_by(status="completed").all()

        logger.debug('Reopening based on persistence')
        #"Daily", "Weekly", "Biweekly" ,"Monthly", "Quarterly"
        for memo in completed_memos:
            completed_date = datetime.strptime(memo.completed_date, "%Y-%m-%d").date()
            if memo.persistence == "Daily" and completed_date and (today - completed_date).days >= 1:
                memo.status = "open"
                memo.completed_date = None
            elif memo.persistence == "Weekly" and completed_date and (today - completed_date).days >= 7:
                memo.status = "open"
                memo.completed_date = None
            elif memo.persistence == "Biweekly" and completed_date and (today - completed_date).days >= 14:
                memo.status = "open"
                memo.completed_date = None
            elif memo.persistence == "Monthly" and completed_date and (today - completed_date).days >= 30:
                memo.status = "open"
                memo.completed_date = None
            elif memo.persistence == "Quarterly" and completed_date and (today - completed_date).days >= 90:
                memo.status = "open"
                memo.completed_date = None
        logger.debug('Committing changes to database')
        db.session.commit()

        
        