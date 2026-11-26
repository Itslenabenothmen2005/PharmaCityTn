import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';

export default function NotFoundPage() {
  const { language, isRtl } = useLanguage();
  const error = useRouteError();
  if (error) {
    console.warn('Navigation / Render error captured by router:', error);
  }

  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '600px' }}>
      <EmptyState
        icon={FileQuestion}
        title={language === 'ar' ? 'الصفحة غير موجودة (404)' : 'Page non trouvée (404)'}
        description={
          language === 'ar'
            ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.'
            : "La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'adresse ou retournez à l'accueil."
        }
        action={
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={Home}>
              {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : "Retour à l'accueil"}
            </Button>
          </Link>
        }
      />
    </div>
  );
}
