from .memoModel import Memo,memo_limiter,db

class MemoService:
    
    @staticmethod
    def getAllMemos():
        return Memo.query.all()
    
    @staticmethod
    def getAllMemosCount():
        memos = MemoService.getAllMemos()
        open_count = 0
        completed_count = 0
        for memo in memos:
            if memo.status == "open":
                open_count += 1
            else:
                completed_count += 1
        return {'open_count':open_count,
                'completed_count':completed_count,
                'total':open_count+completed_count}

    @staticmethod
    def createMemo(memo):
        new_memo = Memo(
            title=memo["title"],
            created_date=memo["created_date"],
            target_date=memo["target_date"],
            status="open",
            persistence=memo["persistence"],
            completed_date=None)
        if MemoService.check_existing(new_memo.title,new_memo.persistence):
            return False
        else:
            db.session.add(new_memo)
            db.session.commit()

    @staticmethod
    def check_existing(title,persistence):
        memo = Memo.query.filter_by(title=title,persistence=persistence).first()
        if memo:
            return True
        else:
            return False
        
    @staticmethod
    def check_existing_id(id):
        memo = Memo.query.filter_by(id=id).first()
        if memo:
            return True
        else:
            return False

    @staticmethod
    def deleteMemo(id):
        if MemoService.check_existing_id(id):
            memo = Memo.query.filter_by(id=id).first()
            db.session.delete(memo)
            db.session.commit()
            return True
        else:
            return False

    @staticmethod
    def updateMemo(memo):
        if MemoService.check_existing_id(memo["id"]) and not (MemoService.check_existing(memo["title"],memo["persistence"])):
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
            return False
        
    @staticmethod
    def updateMemoAction(memo):
        if MemoService.check_existing_id(memo["id"]):
            memo_to_update = Memo.query.filter_by(id=memo["id"]).first()
            memo_to_update.completed_date = memo["completed_date"]
            memo_to_update.status = memo["status"]
            db.session.commit()
            return True
        else:
            return False