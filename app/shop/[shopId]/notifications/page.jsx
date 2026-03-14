import NotificationsPageContent from "@/components/shop/notification/notifications-page/notificationsPage-content";

export default async function NotificationsPage({ params }) {
   
    const { shopId } = await params;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Notifications</h1>
                <p className="text-muted-foreground mt-1">Stay updated with your notifications</p>
            </div>

            <NotificationsPageContent shopId={shopId} />
        </div >
    );
}


